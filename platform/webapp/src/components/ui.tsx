import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export function cn(...parts: Array<string | false | null | undefined>) {
  return clsx(parts);
}

export const inputClass =
  'w-full rounded-panel border border-ink/15 bg-surface-raised px-3 py-2 text-sm text-ink outline-none focus:border-trust focus:ring-1 focus:ring-trust';

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export function PrimaryButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-panel bg-cut px-3.5 py-2 text-sm font-semibold text-white disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function SecondaryButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-panel border border-ink/20 bg-surface-raised px-3.5 py-2 text-sm font-medium text-ink hover:border-trust disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function ErrorBanner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-panel border border-status-fail/40 bg-status-fail/10 px-3 py-2 text-sm text-status-fail">
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">{subtitle}</p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}

export function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'rounded-panel border border-ink/10 bg-surface-raised shadow-panel',
        className,
      )}
    >
      {title ? (
        <header className="border-b border-ink/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {title}
        </header>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function StatusChip({
  tone,
  label,
}: {
  tone: 'trust' | 'candidate' | 'watch' | 'held' | 'fail' | 'cut';
  label: string;
}) {
  const tones: Record<typeof tone, string> = {
    trust: 'bg-trust/15 text-trust',
    candidate: 'bg-status-candidate/15 text-status-candidate',
    watch: 'bg-status-watch/15 text-status-watch',
    held: 'bg-status-held/15 text-status-held',
    fail: 'bg-status-fail/15 text-status-fail',
    cut: 'bg-cut/15 text-cut',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] font-medium',
        tones[tone],
      )}
    >
      {label}
    </span>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClass} {...props} />;
}
