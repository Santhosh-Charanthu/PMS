import { cn } from "@/lib/utils";
import { STATUS_STYLES } from "@/constants";

export default function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        STATUS_STYLES[status] || STATUS_STYLES.APPLIED
      )}
    >
      {status?.charAt(0) + status?.slice(1).toLowerCase()}
    </span>
  );
}
