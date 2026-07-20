import { cn } from "@/lib/utils";

export default function Avatar({ src, initials, size = "md", className }) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-20 w-20 text-xl",
    xl: "h-28 w-28 text-3xl",
  };
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="Avatar"
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full gradient-brand font-semibold text-white",
        sizes[size],
        className
      )}
    >
      {initials || "?"}
    </div>
  );
}
