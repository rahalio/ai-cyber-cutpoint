'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/nav';
import { cn } from '@/components/ui';

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 p-3">
      <div className="mb-4 px-2">
        <p className="text-sm font-semibold tracking-tight text-ink">Cutpoint</p>
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Disruption workbench
        </p>
      </div>
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-panel px-2.5 py-2 text-sm transition-colors',
              active
                ? 'bg-cut/12 font-semibold text-cut'
                : 'text-ink-soft hover:bg-surface-sunken',
            )}
          >
            <span className="block">{item.label}</span>
            <span className="block text-[11px] font-normal text-ink-muted">
              {item.hint}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
