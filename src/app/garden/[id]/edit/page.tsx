import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateGardenLog } from "@/app/actions/garden";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPage({ params }: Props) {
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
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">編集</h1>

      <form action={updateGardenLog} className="space-y-4">
        <input type="hidden" name="id" value={log.id} />

        <div>
          <label>タイトル</label>

          <input
            name="title"
            defaultValue={log.title}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>本文</label>

          <textarea
            name="content"
            defaultValue={log.content}
            className="w-full rounded border p-2"
            rows={8}
          />
        </div>

        <div>
          <label>日付</label>

          <input
            type="date"
            name="recordDate"
            defaultValue={log.recordDate.toISOString().split("T")[0]}
            className="w-full rounded border p-2"
          />
        </div>

        <button className="rounded bg-blue-600 px-5 py-2 text-white">
          更新
        </button>
      </form>
    </main>
  );
}
