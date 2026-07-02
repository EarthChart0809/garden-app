import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

export async function getCurrentUserProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile = await prisma.userProfile.findUnique({
    where: {
      id: user.id,
    },
  });

  return profile;
}
