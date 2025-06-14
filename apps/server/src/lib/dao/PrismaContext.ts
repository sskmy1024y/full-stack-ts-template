import { Prisma } from '@prisma/client'

const prismaRwClientSymbole = Symbol('prisma_rw_client')

const prismaTxClientSymbole = Symbol('prisma_tx_client')

export type PrismaRwClient = Prisma.TransactionClient & { [prismaRwClientSymbole]: never }

export type PrismaTxClient = Prisma.TransactionClient & { [prismaTxClientSymbole]: never }

export type PrismaRwContext = {
  readonly client: PrismaRwClient
}

export type PrismaTxContext = {
  readonly client: PrismaTxClient
}
