import { prisma } from "@/lib/prisma";
import GardenCalendar from "@/components/garden/GardenCalendar";

export default async function CalendarPage() {
  const logs = await prisma.gardenLog.findMany({
    orderBy: {
      recordDate: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Garden Calendar</h1>

      <GardenCalendar logs={logs} />
    </main>
  );
}
