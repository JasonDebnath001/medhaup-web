"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Wrong email or password.");
      setLoading(false);
    } else {
      router.replace("/admin");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-navy px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-orange/10 text-orange">
          <Lock size={20} />
        </div>
        <h1 className="font-heading mt-4 text-center text-xl font-extrabold text-navy">
          medhaup Admin
        </h1>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-xl border border-navy/15 px-4 py-3 text-sm text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full rounded-xl border border-navy/15 px-4 py-3 text-sm text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
        {error && (
          <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
        )}
        <button
          disabled={loading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
        >
          {loading ? <Loader2 size={17} className="animate-spin" /> : "Log in"}
        </button>
      </form>
    </div>
  );
}
