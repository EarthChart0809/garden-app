"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/authorization";

export async function createGardenLog(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const recordDate = formData.get("recordDate") as string;
  const profile = await requireAdmin();

  await prisma.gardenLog.create({
    data: {
      title,
      content,
      recordDate: new Date(recordDate),
      authorId: profile.id,
    },
  });

  redirect("/garden");
}

export async function deleteGardenLog(id: number) {
  await prisma.gardenLog.delete({
    where: {
      id,
    },
  });

  redirect("/garden");
}

export async function updateGardenLog(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const recordDate = formData.get("recordDate") as string;

  await prisma.gardenLog.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      recordDate: new Date(recordDate),
    },
  });

  redirect(`/garden/${id}`);
}