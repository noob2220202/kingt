export function InfoPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {lead && <p className="mt-2 text-ink-muted">{lead}</p>}
      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-ink">
        {children}
      </div>
    </div>
  );
}

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 flex flex-col gap-2 text-ink-muted">{children}</div>
    </section>
  );
}
