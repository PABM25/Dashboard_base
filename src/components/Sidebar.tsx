'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation, useLocale } from './LanguageProvider';

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const dict = useTranslation();
  const locale = useLocale();

  const navigation = [
    { name: dict.navigation.overview, href: `/${locale}`, icon: LayoutDashboard },
    { name: dict.navigation.sales, href: `/${locale}/sales`, icon: TrendingUp },
    { name: dict.navigation.inventory, href: `/${locale}/inventory`, icon: Package },
    { name: dict.navigation.hr, href: `/${locale}/hr`, icon: Users },
  ];

  const secondaryNavigation = [
    { name: dict.navigation.settings, href: `/${locale}/settings`, icon: Settings },
    { name: dict.navigation.help, href: `/${locale}/help`, icon: HelpCircle },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 border-r border-slate-800">
      <div className="flex h-16 shrink-0 items-center px-6">
        <span className="text-xl font-bold text-white tracking-tight">EnterpriseOS</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-4 py-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
            {dict.navigation.mainMenu}
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white',
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400',
                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-4 py-4">
          <div className="space-y-1">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors"
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-white transition-colors"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center px-2">
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Tom Cook</p>
              <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300">{dict.navigation.viewProfile}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}