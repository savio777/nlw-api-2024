import { FastifyInstance } from "fastify";
import { pollResultsWs } from "../../websocket/poll-results-ws";

export async function pollResults(app: FastifyInstance) {
  return app.get("/polls/:pollId/results", { websocket: true }, pollResultsWs);
}
