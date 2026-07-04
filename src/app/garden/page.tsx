import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function GardenPage() {
  const logs = await prisma.gardenLog.findMany({
    include: {
      author: true,
    },
  });

  const supabase = await createClient();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">家庭菜園</h1>

      {logs.map((log) => {
        const imageUrl = log.imageUrl
          ? supabase.storage.from("garden-images").getPublicUrl(log.imageUrl)
              .data.publicUrl
          : null;

        const avatarPublicUrl = log.author?.avatarUrl
          ? supabase.storage
              .from("garden-images")
              .getPublicUrl(log.author.avatarUrl).data.publicUrl
          : null;

        return (
          <Link
            key={log.id}
            href={`/garden/${log.id}`}
            className="mb-4 block rounded-xl border p-5 shadow transition hover:shadow-lg"
          >
            <h2>{log.title}</h2>
            <p>{log.recordDate.toLocaleDateString()}</p>
            <p>{log.content}</p>
            <p>🌱 {log.plantName}</p>

            {imageUrl && (
              <Image src={imageUrl} width={400} height={250} alt={log.title} />
            )}

            <div className="mt-3 flex items-center gap-3">
              {avatarPublicUrl && (
                <Image
                  src={avatarPublicUrl}
                  width={40}
                  height={40}
                  alt={log.author?.displayName ?? "avatar"}
                />
              )}
              <p>投稿者：{log.author?.displayName ?? log.author?.email}</p>
            </div>
          </Link>
        );
      })}
    </main>
  );
}
