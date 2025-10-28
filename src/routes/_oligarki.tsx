import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { loginSchema } from "../schemas/auth.schema";
import { prisma } from "@/db";
import { comparePassword } from "../lib/utils";
import { useAppSession } from "@/lib/session";

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator(
    (credential: { email: string; password: string }) => {
      return loginSchema.parse(credential);
    }
  )
  .handler(async ({ data }) => {
    const { email, password } = data;

    const user = await prisma.userAccount.findUnique({
      where: {
        email: email,
      },
    });
    
    if (!user) {
      return {
        error: true,
        userNotFound: true,
        message: "Invalid email or password",
      }
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        error: true,
        invalidCredentials: true,
        message: "Invalid email or password",
      };
    }
    const session = await useAppSession();

    await session.update({
      userEmail: user.email,
    });
  });

export const Route = createFileRoute("/_oligarki")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw new Error("Unauthorized");
    }
  },
});

