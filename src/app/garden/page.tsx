import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function GardenPage() {
  const logs = await prisma.gardenLog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      recordDate: "desc",
    },
  });

  const supabase = await createClient();

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 px-4 sm:px-0">
      <section className="card-surface p-5 sm:p-6">
        <p className="garden-badge mb-4">家庭菜園ログ</p>
        <h1 className="page-title text-2xl font-bold sm:text-3xl">家庭菜園</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          植物の成長や日々の気づきを、カード形式で記録しています。
        </p>
      </section>

      <section className="grid gap-4">
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
              className="garden-card mx-auto block w-full max-w-xl overflow-hidden"
            >
              {imageUrl && (
                <div className="mx-auto w-full max-w-lg overflow-hidden bg-[rgba(129,199,132,0.08)]">
                  <Image
                    src={imageUrl}
                    width={720}
                    height={480}
                    alt={log.title}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="garden-badge text-xs sm:text-sm">
                    🌱 {log.plantName ?? "植物名未設定"}
                  </span>
                  <p className="text-xs text-[var(--muted)] sm:text-sm">
                    {log.recordDate.toLocaleDateString("ja-JP")}
                  </p>
                </div>

                <h2 className="mt-3 text-xl font-bold text-[var(--primary)] sm:text-2xl">
                  {log.title}
                </h2>

                <p className="mt-2 text-sm leading-7 whitespace-pre-wrap text-[var(--foreground)] sm:text-[15px]">
                  {log.content}
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-[rgba(46,125,50,0.1)] pt-3">
                  {avatarPublicUrl && (
                    <Image
                      src={avatarPublicUrl}
                      width={32}
                      height={32}
                      alt={log.author?.displayName ?? "avatar"}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      投稿者：{log.author?.displayName ?? log.author?.email}
                    </p>
                    <p className="truncate text-xs text-[var(--muted)]">
                      記録を開いて詳細を見る
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
