import { Auth } from "@/components/auth";
import { useMutation } from "@tanstack/react-query";
import { loginFn } from "../_oligarki";
import { useRouter } from "@tanstack/react-router";

export function LoginForm() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx?.error) {
        await router.invalidate();
        router.navigate({ to: "/" });
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting login form");

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      console.log("Form Data:", { email, password });
      // Validate inputs
      if (!email || !password) {
        return;
      }

      await loginMutation.mutateAsync({ data: { email, password } });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const getStatus = (): "pending" | "idle" | "success" | "error" => {
    if (loginMutation.isPending) return "pending";
    if (loginMutation.isSuccess) return "success";
    if (loginMutation.isError) return "error";
    return "idle";
  };

  return (
    <Auth actionText="Sign In" onSubmit={handleSubmit} status={getStatus()} />
  );
}
