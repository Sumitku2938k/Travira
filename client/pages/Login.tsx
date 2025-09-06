import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("police");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-card border rounded-lg p-6 space-y-4 shadow-sm"
      >
        <div>
          <h1 className="text-xl font-semibold">Smart Tourist Safety</h1>
          <p className="text-sm text-muted-foreground">Admin Panel Login</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="username">Username</label>
          <input id="username" required className="w-full rounded-md border bg-background px-3 py-2" placeholder="Enter username" />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="password">Password</label>
          <input id="password" type="password" required className="w-full rounded-md border bg-background px-3 py-2" placeholder="••••••••" />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e)=>setRole(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2">
            <option value="police">Police</option>
            <option value="tourism">Tourism Authority</option>
          </select>
        </div>
        <Button className="w-full" type="submit">Login</Button>
      </form>
    </div>
  );
}
