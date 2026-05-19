import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export function StatCard({ title, value, icon, trend, description, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="rounded-md bg-slate-50 p-2 text-slate-600">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-x-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-emerald-600" : "text-rose-600"
            )}
          >
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}
