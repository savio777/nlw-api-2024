import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createPoll(app: FastifyInstance) {
  app.post("/polls", async (request, reply) => {
    const createPollsBodyDto = z.object({
      title: z.string(),
      options: z.array(z.string()),
    });

    const { title, options } = createPollsBodyDto.parse(request.body);

    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map((option) => ({
              title: option,
            })),
          },
        },
      },
    });

    const pollOptions = await prisma.pollOption.findMany({
      where: {
        pollId: poll.id,
      },
    });

    return reply.status(201).send({ poll, options: pollOptions });
  });
}
