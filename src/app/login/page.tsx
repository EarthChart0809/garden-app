"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,

      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");

    router.refresh();
  }

  return (
    <main className="mx-auto mt-20 max-w-md">
      <h1 className="mb-8 text-3xl font-bold">ログイン</h1>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
        />

        <button
          onClick={login}
          className="w-full rounded bg-blue-600 py-2 text-white"
        >
          ログイン
        </button>
      </div>
    </main>
  );
}
