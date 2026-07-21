import { CountUp } from "@/lib/countup";
import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  suffix,
  prefix,
  decimals = 0,
  hint,
  className,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("glass-strong rounded-2xl p-5", className)}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-3xl font-bold tracking-tight text-gradient">
        <CountUp end={value} duration={2.2} separator="," decimals={decimals} prefix={prefix} suffix={suffix} />
      </div>
      {hint && <div className="mt-1 text-[11px] text-accent-foreground/70">{hint}</div>}
    </div>
  );
}