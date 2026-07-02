import { prisma } from "@/lib/prisma";
import { UserProfile } from "@/generated/prisma";

export async function syncUserProfile(user: {
  id: string;
  email?: string;
}): Promise<UserProfile> {
  const existing = await prisma.userProfile.findUnique({
    where: {
      id: user.id,
    },
  });

  if (existing) {
    return existing;
  }

  return await prisma.userProfile.create({
    data: {
      id: user.id,

      email: user.email ?? "",
    },
  });
}
