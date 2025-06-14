import { z } from 'zod'

export const idWithBrandSchema = <T extends string>(brand: T) => z.string().brand(brand)

export type IDSchema<T extends string> = z.ZodBranded<z.ZodString, T>

export type ID<T extends string> = z.infer<z.ZodBranded<z.ZodString, T>>

export const newId = (): string => crypto.randomUUID()

export const withId =
  <ID>(generator: () => ID) =>
  <T>(obj: T): T & { id: ID } => ({ ...obj, id: generator() })

export const withNewId = <T>(obj: T): T & { id: string } => withId(newId)(obj)

export const withNewIdIfNeeded = <T>(obj: T): T & { id: string } => ({ id: newId(), ...obj })

export const newIdWithBrand = <T extends string>(brand: T): ID<T> =>
  idWithBrandSchema(brand).parse(newId())

export const entitySchemaBy = <T extends string>(schema: IDSchema<T>) =>
  z.object({
    id: schema,
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })

export const entitySchema = <T extends string>(brand: T) => entitySchemaBy(idWithBrandSchema(brand))

export type Entity<T extends string> = z.infer<ReturnType<typeof entitySchema<T>>>
