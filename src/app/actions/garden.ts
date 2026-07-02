"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/authorization";
import { createClient } from "@/lib/supabase/server";
import { uploadGardenImage } from "@/lib/storage";

export async function createGardenLog(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const recordDate = formData.get("recordDate") as string;
  const profile = await requireAdmin();
  const image = formData.get("image") as File;
  const imagePath = await uploadGardenImage(image);

  await prisma.gardenLog.create({
    data: {
      title,
      content,
      recordDate: new Date(recordDate),
      author: {
        connect: {
          id: profile.id,
        },
      },
      imageUrl: imagePath,
    },
  });

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = image.name.split(".").pop();
    const filename = `${crypto.randomUUID()}.${extension}`;
    const supabase = await createClient();

    const { data, error } = await supabase.storage

      .from("garden-images")

      .upload(
        filename,

        buffer,

        {
          contentType: image.type,
        },
      );

    if (error) {
      throw new Error(error.message);
    }
  }

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
