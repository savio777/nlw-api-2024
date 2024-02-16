import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getAllPolls(app: FastifyInstance) {
  app.get("/polls", async (request, reply) => {
    const poll = await prisma.poll.findMany({
      include: { options: true },
    });

    return reply.status(200).send({ poll });
  });
}
