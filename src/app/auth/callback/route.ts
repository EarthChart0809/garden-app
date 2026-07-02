import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncUserProfile } from "@/lib/auth";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("exchangeCodeForSession error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = data.session?.user;

    if (user) {
      await syncUserProfile(user);
    } else {
      console.error("No user in session after exchangeCodeForSession");
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}
