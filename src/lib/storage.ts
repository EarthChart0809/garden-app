import { createClient } from "@/lib/supabase/server";

export async function uploadGardenImage(file: File) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("JPEG・PNG・WebPのみアップロードできます。");
  }

  const MAX_SIZE = 5 * 1024 * 1024;

  if (file.size > MAX_SIZE) {
    throw new Error("画像は5MB以下にしてください。");
  }

  if (!file || file.size === 0) {
    return null;
  }

  const supabase = await createClient();

  const extension = file.type.split("/")[1];

  const filename = `${crypto.randomUUID()}.${extension}`;

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const { data, error } = await supabase.storage

    .from("garden-images")

    .upload(
      `garden/${filename}`,

      buffer,

      {
        contentType: file.type,
      },
    );

  if (error) {
    throw new Error(error.message);
  }

  return data.path;
}

export async function uploadAvatar(file: File) {

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

if (!allowedTypes.includes(file.type)) {
  throw new Error("JPEG・PNG・WebPのみアップロードできます。");
}

const MAX_SIZE = 5 * 1024 * 1024;

if (file.size > MAX_SIZE) {
  throw new Error("画像は5MB以下にしてください。");
}

if (!file || file.size === 0) {
  return null;
}

const supabase = await createClient();

const extension = file.type.split("/")[1];

const filename = `${crypto.randomUUID()}.${extension}`;

const bytes = await file.arrayBuffer();

const buffer = Buffer.from(bytes);

const { data, error } = await supabase.storage

  .from("garden-images")

  .upload(
    `avatar/${filename}`,

    buffer,

    {
      contentType: file.type,
    },
  );

if (error) {
  throw new Error(error.message);
}

return data.path;

}