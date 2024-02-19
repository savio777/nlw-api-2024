import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../../lib/prisma";
import { redis } from "../../../lib/redis";
import { voting } from "../../../utils/voting-pub-sub";
import { getPollOptionService } from "../../../services/polls/get-poll-option.service";

export async function deleteVoteByU(app: FastifyInstance) {
  app.delete("/polls/:pollId/votes", async (request, reply) => {
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

      if (userPreviousVoteOnPoll) {
        throw new Error("vote don't found");
      }

      await prisma.vote.delete({ where: { id: userPreviousVoteOnPoll.id } });

      const votes = await redis.zincrby(
        pollId,
        -1,
        userPreviousVoteOnPoll.pollOptionId
      );

      const userPreviousVoteOnPollOption = await getPollOptionService(
        userPreviousVoteOnPoll.pollOptionId
      );

      voting.publish(pollId, {
        title: userPreviousVoteOnPollOption.title,
        pollOpionId: userPreviousVoteOnPoll.pollOptionId,
        votes: Number(votes),
      });

      return reply.status(200).send({
        poll: {
          pollId,
          optionId,
          vote: userPreviousVoteOnPoll,
        },
        sessionId,
      });
    }

    throw new Error("user session is required");
  });

  // TODO: tratar erro quando tentar votar na mesma opção da enquete com try catch retornando erro 400
}
