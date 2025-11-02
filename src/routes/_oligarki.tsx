import { createFileRoute, Outlet } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { loginSchema } from "../schemas/auth.schema";
import { prisma } from "@/db";
import { comparePassword } from "../lib/utils";
import { useAppSession } from "@/lib/session";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((data) => {
    console.log("Validating login data:", data);
    return loginSchema.parse(data)
  })
  .handler(async ({ data }) => {
    const { email, password } = data;

    const user = await prisma.userAccount.findUnique({
      where: {
        email: email,
      },
    });
    
    if (!user) {
      console.log("User not found for email:", email);
      return {
        error: true,
        userNotFound: true,
        message: "Invalid email or password",
      }
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password attempt for email:", email);
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

    console.log("Login successful for email:", email);
    return {
      error: false,
      success: true,
      message: "Login successful",
    };
  });

export const Route = createFileRoute("/_oligarki")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw new Error("Unauthorized");
    }
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

