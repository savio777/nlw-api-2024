import { FastifyRequest } from "fastify";
import type { SocketStream } from "@fastify/websocket";
import z from "zod";

import { voting } from "../../utils/voting-pub-sub";

export async function pollResultsWs(
  connection: SocketStream,
  request: FastifyRequest
) {
  const getPollsParamsDto = z.object({
    pollId: z.string().uuid(),
  });

  const { pollId } = getPollsParamsDto.parse(request.params);

  voting.subscribe(pollId, (message) => {
    connection.socket.send(JSON.stringify(message));
  });
}
