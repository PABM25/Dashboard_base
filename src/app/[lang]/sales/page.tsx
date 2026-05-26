'use client';

import { useState } from 'react';
import { StatCard } from "@/components/StatCard";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Activity,
  Download
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { useTranslation, useLocale } from '@/components/LanguageProvider';

const regionalData = [
  { name: 'North America', sales: 45000, target: 40000 },
  { name: 'Europe', sales: 32000, target: 35000 },
  { name: 'Asia', sales: 28000, target: 25000 },
  { name: 'South America', sales: 15000, target: 12000 },
];

const trendData = [
  { name: 'Week 1', current: 12000, previous: 10000 },
  { name: 'Week 2', current: 15000, previous: 11000 },
  { name: 'Week 3', current: 11000, previous: 13000 },
  { name: 'Week 4', current: 18000, previous: 14000 },
];

export default function Sales() {
  const dict = useTranslation();
  const locale = useLocale();
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(locale === 'es' ? 'Datos exportados correctamente' : 'Data exported successfully');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{dict.sales.title}</h1>
          <p className="text-sm text-slate-500">{dict.sales.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium rounded-lg text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer">
            <option>{dict.sales.timeFilters.thisMonth}</option>
            <option>{dict.sales.timeFilters.lastMonth}</option>
            <option>{dict.sales.timeFilters.thisQuarter}</option>
            <option>{dict.sales.timeFilters.thisYear}</option>
          </select>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            {exporting ? (locale === 'es' ? 'Exportando...' : 'Exporting...') : dict.sales.exportData}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={dict.sales.totalRevenue}
          value="$85,400"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 14.5, isPositive: true }}
          description={dict.sales.totalRevenueDesc}
        />
        <StatCard
          title={dict.sales.averageOrderValue}
          value="$1,245"
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: 5.2, isPositive: true }}
          description={dict.sales.averageOrderValueDesc}
        />
        <StatCard
          title={dict.sales.conversionRate}
          value="3.2%"
          icon={<Activity className="h-5 w-5" />}
          trend={{ value: 0.4, isPositive: false }}
          description={dict.sales.conversionRateDesc}
        />
        <StatCard
          title={dict.sales.salesGrowth}
          value="18.5%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 2.1, isPositive: true }}
          description={dict.sales.salesGrowthDesc}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">{dict.sales.regionalPerformance}</h3>
            <p className="text-sm text-slate-500">{dict.sales.regionalPerformanceDesc}</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
              <BarChart data={regionalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="sales" name={locale === 'es' ? "Ventas Actuales" : "Actual Sales"} fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="target" name={locale === 'es' ? "Objetivo" : "Target"} fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">{dict.sales.weeklyTrend}</h3>
            <p className="text-sm text-slate-500">{dict.sales.weeklyTrendDesc}</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="current" name={locale === 'es' ? "Mes Actual" : "Current Month"} stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="previous" name={locale === 'es' ? "Mes Anterior" : "Previous Month"} stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-900">{dict.sales.recentTransactions}</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">{dict.sales.viewAll}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.sales.tableTransactionId}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.sales.tableClient}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.sales.tableAmount}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.sales.tableDate}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.sales.tableStatus}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {[
                { id: 'TRX-9021', client: 'Acme Corp', amount: '$4,500.00', date: 'Oct 24, 2023', status: locale === 'es' ? 'Completado' : 'Completed', color: 'bg-emerald-100 text-emerald-800' },
                { id: 'TRX-9020', client: 'Globex Inc', amount: '$2,100.00', date: 'Oct 24, 2023', status: locale === 'es' ? 'Completado' : 'Completed', color: 'bg-emerald-100 text-emerald-800' },
                { id: 'TRX-9019', client: 'Soylent Corp', amount: '$12,400.00', date: 'Oct 23, 2023', status: locale === 'es' ? 'Procesando' : 'Processing', color: 'bg-blue-100 text-blue-800' },
                { id: 'TRX-9018', client: 'Initech', amount: '$850.00', date: 'Oct 23, 2023', status: locale === 'es' ? 'Fallido' : 'Failed', color: 'bg-rose-100 text-rose-800' },
                { id: 'TRX-9017', client: 'Umbrella Corp', amount: '$6,200.00', date: 'Oct 22, 2023', status: locale === 'es' ? 'Completado' : 'Completed', color: 'bg-emerald-100 text-emerald-800' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.color}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}