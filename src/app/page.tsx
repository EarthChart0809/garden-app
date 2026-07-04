import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center">
      <section className="max-w-2xl text-center">

        <h1 className="page-title mt-6 text-5xl leading-tight font-bold">
          家庭菜園を、
          <br />
          もっと楽しく記録する。
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          植物の成長を写真とともに記録し、 カレンダーや植物ごとの履歴で
          日々の家庭菜園を管理できるWebアプリです。
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/login"
            className="button-primary rounded-xl px-6 py-3 font-semibold transition hover:scale-105"
          >
            ログイン
          </Link>

          <Link
            href="/signup"
            className="button-secondary rounded-xl px-6 py-3 font-semibold"
          >
            サインアップ
          </Link>
        </div>
      </section>
    </main>
  );
}
