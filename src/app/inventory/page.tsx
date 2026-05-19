'use client';

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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inventory Management</h1>
          <p className="text-sm text-slate-500">Monitor stock levels, warehouse capacity, and alerts.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50">
            Scan Item
          </button>
          <button className="px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-indigo-700">
            Add Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Items"
          value="12,405"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Low Stock Alerts"
          value="24"
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          trend={{ value: 5, isPositive: false }}
          description="Items below reorder point"
        />
        <StatCard
          title="Categories"
          value="48"
          icon={<Archive className="h-5 w-5" />}
        />
        <StatCard
          title="Pending Shipments"
          value="156"
          icon={<Truck className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">Inventory Distribution</h3>
            <p className="text-sm text-slate-500">Items by main category</p>
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
                  formatter={(value: any) => [`${value} items`, 'Quantity']}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900">Warehouse Capacity</h3>
            <p className="text-sm text-slate-500">Utilization across locations</p>
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
                  formatter={(value: any) => [`${value}%`, 'Capacity']}
                />
                <Legend />
                <Bar dataKey="capacity" name="Used Space" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="available" name="Available Space" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-900">Low Stock Alerts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">SKU</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">In Stock</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reorder Point</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {[
                { sku: 'ELC-001', name: 'MacBook Pro 16"', category: 'Electronics', stock: 5, reorder: 10, status: 'Critical' },
                { sku: 'OFF-042', name: 'Ergonomic Chair', category: 'Furniture', stock: 12, reorder: 15, status: 'Low' },
                { sku: 'ELC-089', name: 'Dell 27" Monitor', category: 'Electronics', stock: 8, reorder: 20, status: 'Critical' },
                { sku: 'SFT-102', name: 'Adobe CC License', category: 'Software', stock: 2, reorder: 5, status: 'Critical' },
                { sku: 'OFF-115', name: 'Standing Desk', category: 'Furniture', stock: 18, reorder: 20, status: 'Low' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-600">{item.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.reorder}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
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
