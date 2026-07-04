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

  if (!log) notFound();

  return (
    <main className="mx-auto max-w-3xl">
      <div className="garden-card p-8">
        <h1 className="page-title mb-8 text-3xl font-bold">✏️ 記録を編集</h1>

        <form action={updateGardenLog} className="space-y-6">
          <input type="hidden" name="id" value={log.id} />

          <div>
            <label>タイトル</label>

            <input type="text" name="title" defaultValue={log.title} />
          </div>

          <div>
            <label>植物名</label>

            <input
              type="text"
              name="plantName"
              defaultValue={log.plantName ?? ""}
            />
          </div>

          <div>
            <label>記録日</label>

            <input
              type="date"
              name="recordDate"
              defaultValue={log.recordDate.toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label>内容</label>

            <textarea name="content" rows={8} defaultValue={log.content} />
          </div>

          <div className="flex gap-3">
            <button className="button-primary rounded-xl px-6 py-3 font-semibold transition hover:scale-105">
              更新する
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
