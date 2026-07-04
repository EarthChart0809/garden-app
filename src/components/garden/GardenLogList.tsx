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
    return <p className="mt-6 text-gray-500">この日の記録はありません。</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-green-700">🌱 {log.plantName}</p>
          <h2 className="text-xl font-semibold">{log.title}</h2>
          <p className="mt-2 whitespace-pre-wrap">{log.content}</p>
        </div>
      ))}
    </div>
  );
}
