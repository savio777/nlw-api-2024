import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";

import { createPoll } from "../routes/polls/create";
import { getPollById } from "../routes/polls/getById";
import { getAllPolls } from "../routes/polls/getAll";
import { voteOnPoll } from "../routes/polls/vote-on-poll";

const app = Fastify({
  logger: true,
});

app.register(fastifyCookie, {
  secret: process.env.SECRET_COOKIE, // mock
  hook: "onRequest",
  parseOptions: {},
});

app.get("/", (request, reply) => ({
  hello: ":)",
}));

app.register(createPoll);
app.register(getPollById);
app.register(getAllPolls);
app.register(voteOnPoll);

try {
  app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
