import { z } from "zod";
import bcrypt from "bcryptjs";
import type { Usecase } from "../../lib/usecase/types.js";
import type { UsecaseContext } from "../../lib/context/appContext.js";
import { UsecaseError } from "../../lib/usecase/types.js";
import { withUsecaseTraceLog } from "../../lib/usecase/trace.js";
import { userDao } from "../dao/userDao.js";
import { createUser, userSchema } from "../model/user.js";
import { withConn, withTx } from "@/lib/dao/withTx.js";

const inputSchema = userSchema.omit({id: true})

type Input = z.infer<typeof inputSchema>;

const run = async (ctx: UsecaseContext, input: Input): Promise<void> =>
  withUsecaseTraceLog(ctx, "registerUser", { email: input.email }, async () => {
    const daoCtx = withConn(ctx);
    // Check if user already exists
    const existingUser = await userDao.findByEmail(daoCtx, input.email);
    if (existingUser) {
      throw new UsecaseError({
        code: "user_already_exists",
        condition: "pre_condition",
      });
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const userData = createUser({
      email: input.email,
      name: input.name,
      password: passwordHash,
    });
    
    await withTx(daoCtx, async (ctx) => {
      // Create user in the database
      await userDao.create(ctx, userData);
    });
  });

export const registerUserUsecase: Usecase<UsecaseContext, typeof inputSchema, void> = {
  inputSchema,
  run,
};
