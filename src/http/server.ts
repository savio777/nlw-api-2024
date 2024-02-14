import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import { z } from "zod";

const app = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

app.get("/", (request, reply) => ({
  hello: ":)",
}));

app.post("/polls", async (request, reply) => {
  const createPollsBodyDto = z.object({
    title: z.string(),
  });

  const { title } = createPollsBodyDto.parse(request.body);

  const poll = await prisma.poll.create({
    data: {
      title,
    },
  });

  return reply.status(201).send(poll);
});

try {
  app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
