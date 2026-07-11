import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created. Wait for admin approval before booking.");
    setFullName("");
    setPhone("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070b12] px-6 text-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8"
      >
        <Link to="/gym-demo" className="text-sm text-lime-300">
          ← Back to gym demo
        </Link>

        <h1 className="mt-6 text-3xl font-black">Create account</h1>
        <p className="mt-2 text-sm text-white/60">
          Register as a member. An admin must approve your account.
        </p>

        <div className="mt-6 grid gap-4">
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
          />

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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
          />

          <button
            disabled={loading}
            className="rounded-md bg-lime-400 px-5 py-3 font-bold text-black disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          {message && <p className="text-sm text-lime-300">{message}</p>}

          <p className="text-sm text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="text-lime-300">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}