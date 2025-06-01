import { PrismaClient } from "@prisma/client";

export const newPrismaClient = (): PrismaClient => {
  const prisma = new PrismaClient({
    log: [{ emit: "event", level: "query" }, "info", "warn", "error"],
    transactionOptions: {
      maxWait: 5000,
    },
  });
  return prisma;
};
