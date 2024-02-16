import { prisma } from "../../lib/prisma";

export async function getPollOptionService(pollOpionId: string) {
  const response = await prisma.pollOption.findUnique({
    where: { id: pollOpionId },
  });

  return response;
}
