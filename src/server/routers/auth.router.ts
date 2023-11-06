import { sign } from "@/libs/jwt";
import { TRPCError } from "@trpc/server";
import { loginInput } from "../dtos/auth.dto";
import prisma from "../prisma";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  login: publicProcedure.input(loginInput).mutation(async ({ input }) => {
    const user = await prisma.user.findFirst({
      where: { name: input.name, password: input.password },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect name or password",
      });
    }

    return sign({ id: user.id, name: user.name });
  }),
});
