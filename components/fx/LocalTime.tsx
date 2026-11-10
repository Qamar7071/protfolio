"use client";

import { useEffect, useState } from "react";

/* Live clock for Islamabad (PKT). Renders after mount to avoid a hydration mismatch. */
export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      <span className="tabular-nums">{time ?? "--:--"}</span> PKT
    </span>
  );
}
