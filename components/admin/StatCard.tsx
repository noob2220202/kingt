export function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface"
      }`}
    >
      <p className={`text-sm ${highlight ? "text-primary-foreground/80" : "text-ink-muted"}`}>
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
