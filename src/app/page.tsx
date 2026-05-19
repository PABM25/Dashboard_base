'use client';

import { StatCard } from "@/components/StatCard";
import {
  DollarSign,
  Users,
  Package,
  TrendingUp
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 7500 },
  { name: 'Jul', value: 8000 },
];

const hrData = [
  { name: 'Jan', count: 120 },
  { name: 'Feb', count: 125 },
  { name: 'Mar', count: 130 },
  { name: 'Apr', count: 132 },
  { name: 'May', count: 140 },
  { name: 'Jun', count: 145 },
  { name: 'Jul', count: 152 },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Executive Overview</h1>
          <p className="text-sm text-slate-500">Welcome back! Here&apos;s what&apos;s happening across the organization today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50">
            Download Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$124,500"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 12.5, isPositive: true }}
          description="vs. previous month"
        />
        <StatCard
          title="Total Employees"
          value="152"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 3.2, isPositive: true }}
          description="3 new hires this month"
        />
        <StatCard
          title="Active Inventory Items"
          value="1,429"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 1.4, isPositive: false }}
          description="Across 3 warehouses"
        />
        <StatCard
          title="Profit Margin"
          value="24.8%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 2.1, isPositive: true }}
          description="vs. previous month"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">Revenue Growth</h3>
            <p className="text-sm text-slate-500">Monthly revenue for the current year</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Headcount Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-slate-900">Employee Headcount</h3>
              <p className="text-sm text-slate-500">Organization growth over time</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hrData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-medium text-slate-900">Recent Cross-Department Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Event</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {[
                { event: 'Q3 Enterprise Deal Signed', dept: 'Sales', date: 'Today, 10:42 AM', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
                { event: 'Server Restock Order Received', dept: 'Inventory', date: 'Today, 09:15 AM', status: 'Pending Review', color: 'bg-amber-100 text-amber-800' },
                { event: 'New Senior Developer Onboarded', dept: 'HR', date: 'Yesterday, 02:00 PM', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
                { event: 'Warehouse Audit', dept: 'Inventory', date: 'Yesterday, 11:30 AM', status: 'In Progress', color: 'bg-blue-100 text-blue-800' },
              ].map((item, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.dept}</td>
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
