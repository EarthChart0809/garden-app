import { createGardenLog } from "@/app/actions/garden";

export default function NewGardenPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">新しい記録</h1>

      <form action={createGardenLog} className="space-y-4">
        <div>
          <label>タイトル</label>

          <input name="title" required className="w-full rounded border p-2" />
        </div>

        <div>
          <label>本文</label>

          <textarea
            name="content"
            rows={6}
            className="w-full rounded border p-2"
          />
        </div>

        <input type="file" name="image" accept="image/*" />

        <div>
          <label>日付</label>

          <input
            type="date"
            name="recordDate"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <button className="rounded bg-green-600 px-5 py-2 text-white">
          登録
        </button>
      </form>
    </main>
  );
}
