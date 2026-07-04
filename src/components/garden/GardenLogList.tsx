type GardenLog = {
  id: number;
  title: string;
  content: string;
  plantName: string | null;
  recordDate: Date;
};

type Props = {
  logs: GardenLog[];
};

export default function GardenLogList({ logs }: Props) {
  if (logs.length === 0) {
    return (
      <div className="garden-card mt-6 p-6 text-[var(--muted)]">
        この日の記録はありません。
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-5">
      {logs.map((log) => (
        <article key={log.id} className="garden-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="garden-badge">
              🌱 {log.plantName ?? "植物名未設定"}
            </span>
            <time className="text-sm text-[var(--muted)]">
              {log.recordDate.toLocaleDateString("ja-JP")}
            </time>
          </div>

          <h2 className="mt-4 text-xl font-bold text-[var(--primary)]">
            {log.title}
          </h2>

          <p className="mt-3 leading-7 whitespace-pre-wrap text-[var(--foreground)]">
            {log.content}
          </p>
        </article>
      ))}
    </div>
  );
}
