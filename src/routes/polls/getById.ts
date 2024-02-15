import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function getPollById(app: FastifyInstance) {
  app.get("/polls/:pollId", async (request, reply) => {
    const getPollsParamsDto = z.object({
      pollId: z.string(),
    });

    const { pollId } = getPollsParamsDto.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: true },
    });

    return reply.status(200).send({ poll });
  });
}
