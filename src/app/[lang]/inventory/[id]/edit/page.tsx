'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation, useLocale } from '@/components/LanguageProvider';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EditInventoryItem() {
  const dict = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert(dict.inventory.itemSaved);
      router.push(`/${locale}/inventory`);
    }, 1000);
  };

  const handleDelete = () => {
    if (confirm("Are you sure?")) {
      setDeleting(true);
      setTimeout(() => {
        setDeleting(false);
        alert(dict.inventory.itemDeleted);
        router.push(`/${locale}/inventory`);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/inventory`} className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{dict.inventory.editItem}</h1>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {deleting ? '...' : dict.inventory.delete}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.inventory.formSku}
                </label>
                <input
                  type="text"
                  id="sku"
                  defaultValue="ELC-001"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.inventory.formCategory}
                </label>
                <select
                  id="category"
                  defaultValue="Electronics"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                >
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Office Supplies</option>
                  <option>Software</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.inventory.formName}
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue="MacBook Pro 16&quot;"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.inventory.formStock}
                </label>
                <input
                  type="number"
                  id="stock"
                  defaultValue="5"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="reorder" className="block text-sm font-medium text-slate-700 mb-2">
                  {dict.inventory.formReorder}
                </label>
                <input
                  type="number"
                  id="reorder"
                  defaultValue="10"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
            <Link
              href={`/${locale}/inventory`}
              className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50"
            >
              {dict.inventory.back}
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? '...' : dict.inventory.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}