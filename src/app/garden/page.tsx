import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function GardenPage() {
  const logs = await prisma.gardenLog.findMany({
    include: {
      author: true,
    },
  });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">家庭菜園</h1>

      {logs.map((log) => (
        <Link
          key={log.id}
          href={`/garden/${log.id}`}
          className="mb-4 block rounded-xl border p-5 shadow transition hover:shadow-lg"
        >
          <h2>{log.title}</h2>

          <p>{log.recordDate.toLocaleDateString()}</p>

          <p>{log.content}</p>
          <p>
            投稿者：
            {log.author?.displayName ?? log.author?.email}
          </p>
        </Link>
      ))}
    </main>
  );
}
