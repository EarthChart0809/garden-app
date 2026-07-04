import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-5xl">
      {/* タイトル */}
      <div className="mb-10">
        <span className="garden-badge">🌱 Admin Dashboard</span>

        <h1 className="page-title mt-4 text-4xl font-bold">管理画面</h1>

        <p className="mt-3 text-gray-600">
          家庭菜園の記録やプロフィールを管理できます。
        </p>
      </div>

      {/* メニュー */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 新規投稿 */}
        <Link
          href="/admin/new"
          className="garden-card group p-8 transition hover:-translate-y-1"
        >
          <div className="text-5xl">🌱</div>

          <h2 className="mt-5 text-2xl font-bold text-green-800">新しい記録</h2>

          <p className="mt-2 text-gray-600">家庭菜園の成長記録を追加します。</p>

          <div className="button-primary mt-6 inline-flex items-center rounded-xl px-5 py-3 font-semibold">
            + 新規投稿
          </div>
        </Link>

        {/* 今後追加予定 */}
        <div className="garden-card p-8 opacity-70">
          <div className="text-5xl">📊</div>

          <h2 className="mt-5 text-2xl font-bold text-green-800">
            ダッシュボード
          </h2>

          <p className="mt-2 text-gray-600">投稿数や統計情報を表示予定です。</p>

          <div className="mt-6 rounded-xl bg-gray-100 px-5 py-3 text-gray-500">
            Coming Soon
          </div>
        </div>
      </div>
    </main>
  );
}
