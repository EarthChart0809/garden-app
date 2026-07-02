import Link from "next/link";
import { getCurrentUserProfile } from "@/lib/current-profile";
import LogoutButton from "@/components/LogoutButton";

export default async function Header() {
  const profile = await getCurrentUserProfile();

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          🌱 Garden Portfolio
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/garden">Garden</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>

          {profile ? (
            <>
              <span>{profile?.displayName ?? "プロフィール未設定"}</span>

              <LogoutButton />
              {profile?.role === "ADMIN" && <Link href="/admin">Admin</Link>}
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
