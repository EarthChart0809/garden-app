import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/current-profile";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
