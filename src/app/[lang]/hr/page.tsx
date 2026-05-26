'use client';

import { useState } from 'react';
import { StatCard } from "@/components/StatCard";
import {
  Users,
  UserPlus,
  Briefcase,
  CalendarOff
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useTranslation, useLocale } from '@/components/LanguageProvider';

const deptData = [
  { name: 'Engineering', count: 45 },
  { name: 'Sales', count: 32 },
  { name: 'Marketing', count: 18 },
  { name: 'Customer Support', count: 25 },
  { name: 'HR & Admin', count: 12 },
  { name: 'Finance', count: 8 },
];

const diversityData = [
  { name: 'Male', value: 55 },
  { name: 'Female', value: 42 },
  { name: 'Non-binary', value: 3 },
];

const COLORS = ['#3b82f6', '#ec4899', '#8b5cf6'];

export default function HR() {
  const dict = useTranslation();
  const locale = useLocale();
  const [viewing, setViewing] = useState(false);
  const [addingEmployee, setAddingEmployee] = useState(false);

  const handleView = () => {
    setViewing(true);
    setTimeout(() => {
      setViewing(false);
      alert(locale === 'es' ? 'Abriendo directorio...' : 'Opening directory...');
    }, 1000);
  };

  const handleAddEmployee = () => {
    setAddingEmployee(true);
    setTimeout(() => {
      setAddingEmployee(false);
      alert(locale === 'es' ? 'Nuevo empleado añadido' : 'New employee added');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{dict.hr.title}</h1>
          <p className="text-sm text-slate-500">{dict.hr.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleView}
            disabled={viewing}
            className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {viewing ? (locale === 'es' ? 'Cargando...' : 'Loading...') : dict.hr.viewDirectory}
          </button>
          <button
            onClick={handleAddEmployee}
            disabled={addingEmployee}
            className="px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {addingEmployee ? (locale === 'es' ? 'Añadiendo...' : 'Adding...') : dict.hr.addEmployee}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={dict.hr.totalHeadcount}
          value="140"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 4.2, isPositive: true }}
          description={dict.hr.totalHeadcountDesc}
        />
        <StatCard
          title={dict.hr.openRoles}
          value="12"
          icon={<Briefcase className="h-5 w-5" />}
          description={dict.hr.openRolesDesc}
        />
        <StatCard
          title={dict.hr.newHires}
          value="24"
          icon={<UserPlus className="h-5 w-5" />}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title={dict.hr.onLeave}
          value="8"
          icon={<CalendarOff className="h-5 w-5" />}
          description={dict.hr.onLeaveDesc}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">{dict.hr.headcountByDepartment}</h3>
            <p className="text-sm text-slate-500">{dict.hr.headcountByDepartmentDesc}</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: any) => [`${value} ${locale === 'es' ? 'empleados' : 'employees'}`, locale === 'es' ? 'Cantidad' : 'Count']}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">{dict.hr.genderDistribution}</h3>
            <p className="text-sm text-slate-500">{dict.hr.genderDistributionDesc}</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diversityData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diversityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: any) => [`${value}%`, locale === 'es' ? 'Porcentaje' : 'Percentage']}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-900">{dict.hr.recentChanges}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.hr.tableEmployee}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.hr.tableRole}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.hr.tableDepartment}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.hr.tableType}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.hr.tableDate}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {[
                { name: 'Sarah Jenkins', role: 'Senior Frontend Engineer', dept: 'Engineering', type: locale === 'es' ? 'Nueva Contratación' : 'New Hire', date: 'Oct 24, 2023', color: 'bg-emerald-100 text-emerald-800' },
                { name: 'Michael Chen', role: 'Account Executive', dept: 'Sales', type: locale === 'es' ? 'Promoción' : 'Promotion', date: 'Oct 20, 2023', color: 'bg-blue-100 text-blue-800' },
                { name: 'Emily Rodriguez', role: 'Marketing Manager', dept: 'Marketing', type: locale === 'es' ? 'Regreso de Licencia' : 'Return from Leave', date: 'Oct 15, 2023', color: 'bg-purple-100 text-purple-800' },
                { name: 'David Kim', role: 'Customer Success Rep', dept: 'Customer Support', type: locale === 'es' ? 'Nueva Contratación' : 'New Hire', date: 'Oct 12, 2023', color: 'bg-emerald-100 text-emerald-800' },
                { name: 'Jessica Taylor', role: 'Financial Analyst', dept: 'Finance', type: locale === 'es' ? 'Desvinculación' : 'Offboarding', date: 'Oct 05, 2023', color: 'bg-slate-100 text-slate-800' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.dept}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.color}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}