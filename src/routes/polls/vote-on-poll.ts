import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../lib/prisma";
import { redis } from "../../lib/redis";

const ONE_MONTH = 60 * 60 * 30;

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/option/:optionId/votes", async (request, reply) => {
    const voteOnPollParamsDto = z.object({
      pollId: z.string().uuid(),
      optionId: z.string().uuid(),
    });

    const { pollId, optionId } = voteOnPollParamsDto.parse(request.params);

    let { sessionId } = request.cookies;

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      });

      // deletar voto anterior
      // e passar para criar um novo com o código a seguir
      if (
        userPreviousVoteOnPoll &&
        userPreviousVoteOnPoll.pollOptionId !== optionId
      ) {
        await prisma.vote.delete({ where: { id: userPreviousVoteOnPoll.id } });

        await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId);
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: ONE_MONTH,
        signed: true,
        httpOnly: true,
      });
    }

    const vote = await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId: optionId,
      },
    });

    await redis.zincrby(pollId, 1, optionId);

    return reply.status(201).send({
      poll: {
        pollId,
        optionId,
        vote,
      },
      sessionId,
    });
  });

  // TODO: tratar erro quando tentar votar na mesma opção da enquete com try catch retornando erro 400
}
