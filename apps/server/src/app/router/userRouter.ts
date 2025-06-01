import { router, procedure } from "../../lib/server/trpc.js";
import { registerUserUsecase } from "../usecase/registerUser.js";
import { loginUserUsecase } from "../usecase/loginUser.js";

export const userRouter = router({
  register: procedure
    .input(registerUserUsecase.inputSchema)
    .mutation(async ({ input, ctx }) => {
      return registerUserUsecase.run(ctx, input);
    }),

  login: procedure
    .input(loginUserUsecase.inputSchema)
    .mutation(async ({ input, ctx }) => {
      return loginUserUsecase.run(ctx, input);
    }),
});
