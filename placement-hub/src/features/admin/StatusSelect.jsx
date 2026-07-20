"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { APPLICATION_STATUSES, STATUS_STYLES } from "@/constants";
import { cn } from "@/lib/utils";

export default function StatusSelect({ value, onChange, disabled }) {
  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset focus-ring",
          STATUS_STYLES[value] || STATUS_STYLES.APPLIED
        )}
      >
        <Select.Value />
        <ChevronDown className="h-3 w-3" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg" position="popper" sideOffset={6}>
          <Select.Viewport className="p-1">
            {APPLICATION_STATUSES.map((s) => (
              <Select.Item
                key={s}
                value={s}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-[var(--foreground)] outline-none data-[highlighted]:bg-slate-50 dark:data-[highlighted]:bg-white/5"
              >
                <Select.ItemText>{s.charAt(0) + s.slice(1).toLowerCase()}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="h-3.5 w-3.5 text-[var(--primary)]" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
