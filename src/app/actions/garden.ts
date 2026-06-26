"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createGardenLog(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const recordDate = formData.get("recordDate") as string;

  await prisma.gardenLog.create({
    data: {
      title,
      content,
      recordDate: new Date(recordDate),
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
