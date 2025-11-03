import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });
function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <span>Welcome to project dyadia</span>
      {/* Login Button */}
      <Button onClick={() => { void navigate({ to: "/login" }); }}>Login</Button>
    </div>
  );
}

