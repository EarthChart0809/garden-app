"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("認証メールを送信しました。メールをご確認ください。");
  }

  return (
    <main className="mx-auto mt-20 max-w-md">
      <h1 className="mb-8 text-3xl font-bold">新規登録</h1>

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
          onClick={signUp}
          className="w-full rounded bg-green-600 py-2 text-white"
        >
          新規登録
        </button>
      </div>
    </main>
  );
}
