import { Auth } from "@/components/auth";
import { useState } from "react";

export function LoginForm() {
  const [status, setStatus] = useState<'pending' | 'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('pending');

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // Validate inputs
      if (!email || !password) {
        setStatus('error');
        return;
      }

      // TODO: Replace with actual authentication API call
      console.log('Login attempt:', { email, password });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // On success
      setStatus('success');
      
      // Redirect or handle post-login logic
      setTimeout(() => {
        // You can add navigation here
        console.log('Login successful, redirecting...');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setStatus('error');
    }
  };

  return (
    <Auth
      actionText="Sign In"
      onSubmit={handleSubmit}
      status={status}
    />
  );
}