import { newPrismaClient } from "../prisma/client.js";

export const prisma = newPrismaClient();

export type PrismaCleint = typeof prisma;
