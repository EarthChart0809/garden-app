"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/");

    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded bg-red-600 px-4 py-2 text-white"
    >
      ログアウト
    </button>
  );
}
