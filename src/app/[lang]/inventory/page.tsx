'use client';

import { useState } from 'react';
import { StatCard } from "@/components/StatCard";
import {
  Package,
  AlertTriangle,
  Archive,
  Truck
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { useTranslation, useLocale } from '@/components/LanguageProvider';

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Furniture', value: 300 },
  { name: 'Office Supplies', value: 300 },
  { name: 'Software', value: 200 },
];

const COLORS = ['#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4'];

const warehouseData = [
  { name: 'New York', capacity: 85, available: 15 },
  { name: 'London', capacity: 60, available: 40 },
  { name: 'Tokyo', capacity: 92, available: 8 },
  { name: 'Sydney', capacity: 45, available: 55 },
];

export default function Inventory() {
  const dict = useTranslation();
  const locale = useLocale();
  const [scanning, setScanning] = useState(false);
  const [addingStock, setAddingStock] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      alert(locale === 'es' ? 'Artículo escaneado' : 'Item scanned');
    }, 1000);
  };

  const handleAddStock = () => {
    setAddingStock(true);
    setTimeout(() => {
      setAddingStock(false);
      alert(locale === 'es' ? 'Stock añadido exitosamente' : 'Stock added successfully');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{dict.inventory.title}</h1>
          <p className="text-sm text-slate-500">{dict.inventory.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleScan}
            disabled={scanning}
            className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {scanning ? (locale === 'es' ? 'Escaneando...' : 'Scanning...') : dict.inventory.scanItem}
          </button>
          <button
            onClick={handleAddStock}
            disabled={addingStock}
            className="px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {addingStock ? (locale === 'es' ? 'Añadiendo...' : 'Adding...') : dict.inventory.addStock}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={dict.inventory.totalItems}
          value="12,405"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title={dict.inventory.lowStockAlerts}
          value="24"
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          trend={{ value: 5, isPositive: false }}
          description={dict.inventory.lowStockAlertsDesc}
        />
        <StatCard
          title={dict.inventory.categories}
          value="48"
          icon={<Archive className="h-5 w-5" />}
        />
        <StatCard
          title={dict.inventory.pendingShipments}
          value="156"
          icon={<Truck className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">{dict.inventory.inventoryDistribution}</h3>
            <p className="text-sm text-slate-500">{dict.inventory.inventoryDistributionDesc}</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: any) => [`${value} ${locale === 'es' ? 'artículos' : 'items'}`, locale === 'es' ? 'Cantidad' : 'Quantity']}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">{dict.inventory.warehouseCapacity}</h3>
            <p className="text-sm text-slate-500">{dict.inventory.warehouseCapacityDesc}</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={warehouseData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: any) => [`${value}%`, locale === 'es' ? 'Capacidad' : 'Capacity']}
                />
                <Legend />
                <Bar dataKey="capacity" name={locale === 'es' ? "Espacio Usado" : "Used Space"} stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="available" name={locale === 'es' ? "Espacio Disponible" : "Available Space"} stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-900">{dict.inventory.lowStockAlerts}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.inventory.tableSku}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.inventory.tableProductName}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.inventory.tableCategory}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.inventory.tableInStock}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.inventory.tableReorderPoint}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.inventory.tableStatus}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {[
                { sku: 'ELC-001', name: 'MacBook Pro 16"', category: 'Electronics', stock: 5, reorder: 10, status: locale === 'es' ? 'Crítico' : 'Critical' },
                { sku: 'OFF-042', name: 'Ergonomic Chair', category: 'Furniture', stock: 12, reorder: 15, status: locale === 'es' ? 'Bajo' : 'Low' },
                { sku: 'ELC-089', name: 'Dell 27" Monitor', category: 'Electronics', stock: 8, reorder: 20, status: locale === 'es' ? 'Crítico' : 'Critical' },
                { sku: 'SFT-102', name: 'Adobe CC License', category: 'Software', stock: 2, reorder: 5, status: locale === 'es' ? 'Crítico' : 'Critical' },
                { sku: 'OFF-115', name: 'Standing Desk', category: 'Furniture', stock: 18, reorder: 20, status: locale === 'es' ? 'Bajo' : 'Low' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-600">{item.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.reorder}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      (item.status === 'Critical' || item.status === 'Crítico') ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
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