"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import GardenLogList from "./GardenLogList";

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

export default function GardenCalendar({ logs }: Props) {
  const [selected, setSelected] = useState<Date>();
  const markedDays = logs.map((log) => new Date(log.recordDate));

  const filteredLogs = logs.filter((log) => {
    if (!selected) return false;
    return new Date(log.recordDate).toDateString() === selected.toDateString();
  });

  return (
    <>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={{
          hasLog: markedDays,
        }}
        modifiersClassNames={{
          hasLog: "bg-green-500 text-white rounded-full",
        }}
      />
      <GardenLogList logs={filteredLogs} />
      <p className="mt-6">{selected?.toLocaleDateString("ja-JP")}</p>
    </>
  );
}
