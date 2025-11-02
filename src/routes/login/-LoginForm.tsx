import { Auth } from "@/components/auth";
import { useMutation } from "@tanstack/react-query";
import { loginFn } from "../_oligarki";
import { useRouter } from "@tanstack/react-router";

export function LoginForm() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async (result) => {
      if (!result?.error) {
        await router.invalidate();
        // Redirect to dashboard on successful login
        router.navigate({ to: "/dashboard" });
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
    if (loginMutation.isSuccess && !loginMutation.data?.error) return "success";
    if (loginMutation.isError || loginMutation.data?.error) return "error";
    return "idle";
  };

  const getErrorMessage = (): string | undefined => {
    if (loginMutation.data?.error && loginMutation.data?.message) {
      return loginMutation.data.message;
    }
    return undefined;
  };

  return (
    <Auth 
      actionText="Sign In" 
      onSubmit={handleSubmit} 
      status={getStatus()} 
      errorMessage={getErrorMessage()}
    />
  );
}
