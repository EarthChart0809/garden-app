import Link from "next/link";
import Image from "next/image";
import { getCurrentUserProfile } from "@/lib/current-profile";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function Header() {
  const profile = await getCurrentUserProfile();
  const supabase = await createClient();

  const avatarPublicUrl = profile?.avatarUrl
    ? supabase.storage.from("garden-images").getPublicUrl(profile.avatarUrl)
        .data.publicUrl
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(46,125,50,0.12)] bg-[rgba(250,250,245,0.9)] backdrop-blur">
      <div className="section-shell py-4">
        <div className="card-surface flex items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[rgba(46,125,50,0.12)]">
              <Image
                src="/logo.png"
                alt="Garden Portfolio Logo"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-lg leading-none font-bold text-[var(--primary)]">
                Garden Portfolio
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                家庭菜園の記録をやさしく管理
              </p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
            <Link
              href="/garden"
              className="rounded-full px-4 py-2 text-[var(--foreground)] transition hover:bg-[rgba(129,199,132,0.14)]"
            >
              Garden
            </Link>
            <Link
              href="/garden/calendar"
              className="rounded-full px-4 py-2 text-[var(--foreground)] transition hover:bg-[rgba(129,199,132,0.14)]"
            >
              Calendar
            </Link>
            <Link
              href="/profile"
              className="rounded-full px-4 py-2 text-[var(--foreground)] transition hover:bg-[rgba(129,199,132,0.14)]"
            >
              Profile
            </Link>

            {profile ? (
              <>
                {profile.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="rounded-full px-4 py-2 font-medium text-[var(--primary)] transition hover:bg-[rgba(129,199,132,0.14)]"
                  >
                    Admin
                  </Link>
                )}

                <div className="flex items-center gap-3 rounded-full border border-[rgba(46,125,50,0.12)] bg-white px-3 py-2">
                  {avatarPublicUrl ? (
                    <Image
                      src={avatarPublicUrl}
                      width={32}
                      height={32}
                      alt={profile.displayName ?? "avatar"}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(129,199,132,0.18)] text-sm font-semibold text-[var(--primary)]">
                      {profile.displayName?.slice(0, 1) ?? "U"}
                    </div>
                  )}

                  <span className="max-w-[140px] truncate text-sm font-medium">
                    {profile.displayName ?? "プロフィール未設定"}
                  </span>
                </div>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-[rgba(46,125,50,0.14)] px-4 py-2 font-medium text-[var(--primary)] transition hover:bg-[rgba(129,199,132,0.14)]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="button-primary rounded-full px-4 py-2 font-medium transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
