import Fastify from "fastify";
import { createPoll } from "../routes/polls/create";

const app = Fastify({
  logger: true,
});

app.get("/", (request, reply) => ({
  hello: ":)",
}));

app.register(createPoll);

try {
  app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
