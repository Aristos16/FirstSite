import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setLoading(false);
      setMessage(error?.message ?? "Login failed.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, approval_status")
      .eq("id", data.user.id)
      .single();

    setLoading(false);

    if (profileError || !profile) {
      setMessage("Could not load your profile.");
      return;
    }

    if (profile.approval_status !== "approved") {
      setMessage("Your account is not approved yet.");
      return;
    }

    if (profile.role === "admin") {
      window.location.href = "/admin";
      return;
    }

    window.location.href = "/account";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070b12] px-6 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8"
      >
        <Link to="/gym-demo" className="text-sm text-lime-300">
          ← Back to gym demo
        </Link>

        <h1 className="mt-6 text-3xl font-black">Login</h1>
        <p className="mt-2 text-sm text-white/60">
          Login to book appointments or manage the gym.
        </p>

        <div className="mt-6 grid gap-4">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
          />

          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
          />

          <button
            disabled={loading}
            className="rounded-md bg-lime-400 px-5 py-3 font-bold text-black disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <p className="text-sm text-lime-300">{message}</p>}

          <p className="text-sm text-white/60">
            No account?{" "}
            <Link to="/register" className="text-lime-300">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}