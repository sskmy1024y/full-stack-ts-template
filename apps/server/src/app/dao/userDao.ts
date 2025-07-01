import { newUser, type User } from '../model/user.js'
import type { DaoRwContext } from '../../lib/context/DaoContext.js'
import { Prisma } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userArgs = Prisma.validator<Prisma.UserDefaultArgs>()({})

type DTO = Prisma.UserGetPayload<typeof userArgs>

const dtoToModel = (user: DTO): User => {
  return newUser({
    id: user.id,
    email: user.email,
    name: user.name || '',
    password: user.password,
  })
}

const findByUserId = async (ctx: DaoRwContext, id: User['id']): Promise<User | null> => {
  const user = await ctx.client.user.findUnique({
    where: { id },
  })

  return user ? dtoToModel(user) : null
}

const findByEmail = async (ctx: DaoRwContext, email: string): Promise<User | null> => {
  const user = await ctx.client.user.findUnique({
    where: { email },
  })

  return user ? dtoToModel(user) : null
}

const create = async (ctx: DaoRwContext, user: User): Promise<void> => {
  await ctx.client.user.create({
    data: user,
  })
}

const update = async (ctx: DaoRwContext, user: User): Promise<void> => {
  await ctx.client.user.update({
    where: { id: user.id },
    data: user,
  })
}

const deleteUser = async (ctx: DaoRwContext, id: User['id']): Promise<void> => {
  await ctx.client.user.delete({
    where: { id },
  })
}

export const userDao = {
  findByUserId,
  findByEmail,
  create,
  update,
  delete: deleteUser,
}
