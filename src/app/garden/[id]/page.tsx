import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GardenDetail({ params }: Props) {
  const { id } = await params;

  const log = await prisma.gardenLog.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!log) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">{log.title}</h1>

      <p className="mt-2 text-gray-500">
        {log.recordDate.toLocaleDateString("ja-JP")}
      </p>

      <article className="mt-6 whitespace-pre-wrap">{log.content}</article>

      <div className="mt-8">
        <Link
          href={`/garden/${log.id}/edit`}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          編集
        </Link>
      </div>

      <form
        action={async () => {
          "use server";

          await deleteGardenLog(log.id);
        }}
      >
        <button className="ml-3 rounded bg-red-600 px-4 py-2 text-white">
          削除
        </button>
      </form>
    </main>
  );
}
