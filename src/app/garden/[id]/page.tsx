import { prisma } from "@/lib/prisma";
import { deleteGardenLog } from "@/app/actions/garden";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/authorization";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GardenDetail({ params }: Props) {
  await requireAdmin();

  const { id } = await params;

  const log = await prisma.gardenLog.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!log) notFound();

  return (
    <main className="mx-auto max-w-4xl">
      <div className="garden-card p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="garden-badge">🌱 {log.plantName}</span>

            <h1 className="page-title mt-4 text-4xl font-bold">{log.title}</h1>

            <p className="mt-3 text-sm text-gray-500">
              📅 {log.recordDate.toLocaleDateString("ja-JP")}
            </p>
          </div>
        </div>

        <hr className="my-8 border-green-100" />

        <article className="leading-8 whitespace-pre-wrap text-gray-700">
          {log.content}
        </article>

        <div className="mt-10 flex gap-3">
          <Link
            href={`/garden/${log.id}/edit`}
            className="button-primary rounded-xl px-6 py-3 font-medium transition hover:scale-105"
          >
            ✏️ 編集
          </Link>

          <form
            action={async () => {
              "use server";
              await deleteGardenLog(log.id);
            }}
          >
            <button className="rounded-xl bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600">
              🗑 削除
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
