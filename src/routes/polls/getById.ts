import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { redis } from "../../lib/redis";

export async function getPollById(app: FastifyInstance) {
  app.get("/polls/:pollId", async (request, reply) => {
    const getPollsParamsDto = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollsParamsDto.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: true },
    });

    if (!poll) {
      return reply.status(400).send({ message: "Poll not found" });
    }

    const resultCount = await redis.zrange(pollId, 0, -1, "WITHSCORES");

    const votes = resultCount.reduce((currentArr, line, index) => {
      if (index % 2 === 0) {
        const findVote = poll.options.find((option) => option.id === line);

        const score = resultCount[index + 1];

        currentArr.push({
          id: line,
          title: findVote?.title,
          count: Number(score),
        });
      }

      return currentArr;
    }, [] as { id: string; title: string; count: number }[]);

    return reply.send({ poll, votes });
  });
}
