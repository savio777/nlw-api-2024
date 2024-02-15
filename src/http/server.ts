import Fastify from "fastify";
import { createPoll } from "../routes/polls/create";
import { getPollById } from "../routes/polls/getById";

const app = Fastify({
  logger: true,
});

app.get("/", (request, reply) => ({
  hello: ":)",
}));

app.register(createPoll);
app.register(getPollById);

try {
  app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
