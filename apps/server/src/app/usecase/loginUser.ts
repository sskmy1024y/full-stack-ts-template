import { z } from "zod";
import bcrypt from "bcryptjs";
import type { Usecase } from "../../lib/usecase/types.js";
import type { UsecaseContext } from "../../lib/context/appContext.js";
import { UsecaseError } from "../../lib/usecase/types.js";
import { withUsecaseTraceLog } from "../../lib/usecase/trace.js";
import { userDao } from "../dao/userDao.js";
import { userSchema } from "../model/user.js";
import { withConn } from "@/lib/dao/withTx.js";

const inputSchema = userSchema.pick({
  email: true,
  password: true,
})

type Input = z.infer<typeof inputSchema>;
type Output = { id: string; email: string };

const run = async (ctx: UsecaseContext, input: Input): Promise<Output> =>
  withUsecaseTraceLog(ctx, "loginUser", { email: input.email }, async () => {
    const daoCtx = withConn(ctx);
    // Find user by email
    const user = await userDao.findByEmail(daoCtx, input.email);
    if (!user) {
      throw new UsecaseError({
        code: "invalid_credentials",
        condition: "pre_condition",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new UsecaseError({
        code: "invalid_credentials",
        condition: "pre_condition",
      });
    }

    return {
      id: user.id,
      email: user.email,
    };
  });

export const loginUserUsecase: Usecase<UsecaseContext, typeof inputSchema, Output> = {
  inputSchema,
  run,
};
