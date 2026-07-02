"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUserProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    throw new Error("ログインしてください。");
  }

  const displayName = formData.get("displayName")?.toString().trim();
  const bio = formData.get("bio")?.toString().trim();

  if (!displayName) {
    throw new Error("表示名を入力してください。");
  }

  await prisma.userProfile.update({
    where: {
      id: profile.id,
    },
    data: {
      displayName,
      bio,
    },
  });

  redirect("/profile");
}
