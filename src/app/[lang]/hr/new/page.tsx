'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation, useLocale } from '@/components/LanguageProvider';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewEmployee() {
  const dict = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert(dict.hr.employeeSaved);
      router.push(`/${locale}/hr`);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/hr`} className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{dict.hr.newEmployee}</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.hr.formName}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.hr.formRole}
                </label>
                <input
                  type="text"
                  id="role"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.hr.formDepartment}
                </label>
                <select
                  id="department"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                >
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Customer Support</option>
                  <option>HR & Admin</option>
                  <option>Finance</option>
                </select>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.hr.formType}
                </label>
                <select
                  id="type"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
            <Link
              href={`/${locale}/hr`}
              className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50"
            >
              {dict.hr.back}
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? '...' : dict.hr.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}