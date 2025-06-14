import { z } from 'zod'
import { entitySchemaBy, newId } from './common/entity.js'
import { emailSchema } from '@/lib/schema/email.js'

export const userIdSchema = z.string().brand('UserId')

export type UserId = z.infer<typeof userIdSchema>

export const newUserId = (id: string): UserId => userIdSchema.parse(id)

export const createUserId = (): UserId => newUserId(newId())

const passwordSchema = z.string().min(8)

const nameSchema = z.string().min(1).max(100)

export const userSchema = entitySchemaBy(userIdSchema).extend({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
})

export type User = z.infer<typeof userSchema>

export type UserInput = z.input<typeof userSchema>

export const newUser = (userLike: UserInput): User => userSchema.parse(userLike)

export const createUser = (userLike: Omit<UserInput, 'id'>): User =>
  newUser({ ...userLike, id: createUserId() })

export const updateUser = (user: UserInput, attr: Omit<User, 'id'>) => newUser({ ...user, ...attr })
