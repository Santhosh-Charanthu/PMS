"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function getRemaining(deadline) {
  const total = new Date(deadline).getTime() - Date.now();
  if (total <= 0) return null;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

export default function CountdownTimer({ deadline }) {
  const [remaining, setRemaining] = useState(() => (deadline ? getRemaining(deadline) : null));

  useEffect(() => {
    if (!deadline) return;
    const interval = setInterval(() => setRemaining(getRemaining(deadline)), 60000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (!deadline) return null;

  if (!remaining) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-[var(--danger)] dark:bg-rose-500/10">
        <Clock className="h-4 w-4" /> Applications closed
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-[var(--warning)] dark:bg-amber-500/10">
      <Clock className="h-4 w-4" />
      {remaining.days}d {remaining.hours}h {remaining.minutes}m left to apply
    </div>
  );
}
