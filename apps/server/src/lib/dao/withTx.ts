import { prisma } from './prisma.js'
import {
  PrismaRwClient,
  PrismaRwContext,
  PrismaTxClient,
  PrismaTxContext,
} from './PrismaContext.js'

export const withConn = <T>(ctx: T): T & PrismaRwContext => ({
  ...ctx,
  client: prisma as unknown as PrismaRwClient,
})

export type PrismaTxOption = Parameters<typeof prisma.$transaction>[1]

export const withTx = async <T, U>(
  ctx: T,
  f: (ctx: T & PrismaTxContext) => Promise<U>,
  option?: PrismaTxOption
): Promise<U> =>
  prisma.$transaction(async (tx) => {
    const client = tx as PrismaTxClient
    return await f({ ...ctx, client })
  }, option)
