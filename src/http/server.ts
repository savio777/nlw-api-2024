import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyWebsocket from "@fastify/websocket";

import { createPoll } from "./routes/polls/create";
import { getPollById } from "./routes/polls/get-by-id";
import { getAllPolls } from "./routes/polls/get-all";
import { voteOnPoll } from "./routes/polls/vote-on-poll";
import { pollResults } from "./routes/polls/poll-results";

const app = Fastify({
  logger: true,
});

app.register(fastifyCookie, {
  secret: process.env.SECRET_COOKIE, // mock
  hook: "onRequest",
  parseOptions: {},
});

app.register(fastifyWebsocket);

app.get("/", (request, reply) => ({
  hello: ":)",
}));

app.register(createPoll);
app.register(getPollById);
app.register(getAllPolls);
app.register(voteOnPoll);
app.register(pollResults);

try {
  app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
