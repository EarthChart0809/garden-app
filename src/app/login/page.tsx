"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

function getPasswordStrength(value: string) {
  let score = 0;

  if (value.length >= 8) score += 1;
  if (/[a-zA-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^a-zA-Z0-9]/.test(value)) score += 1;

  return score;
}

function EyeIcon({ closed = false }: { closed?: boolean }) {
  return closed ? (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 3l18 18" />
      <path d="M10.58 10.58A2 2 0 0 0 13.42 13.42" />
      <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c5 0 9.27 3.11 11 7-0.64 1.44-1.57 2.77-2.73 3.89" />
      <path d="M6.61 6.61C4.01 8.07 2.15 10.3 1 12c1.73 3.89 6 7 11 7 1.57 0 3.07-.26 4.43-.73" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password],
  );

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

  // const strengthLabel =
  //   passwordStrength <= 1
  //     ? "弱い"
  //     : passwordStrength === 2
  //       ? "ふつう"
  //       : passwordStrength === 3
  //         ? "強い"
  //         : "とても強い";

  // const strengthWidth = `${(passwordStrength / 4) * 100}%`;

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

        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border p-2 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? "パスワードを非表示" : "パスワードを表示"
              }
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-gray-600 hover:text-gray-900"
            >
              <EyeIcon closed={showPassword} />
            </button>
          </div>

          {/* <div className="mt-2">
            <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
              <div
                className={`h-full transition-all ${
                  passwordStrength <= 1
                    ? "bg-red-500"
                    : passwordStrength === 2
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: strengthWidth }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-600">強度: {strengthLabel}</p>
          </div> */}
        </div>

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
