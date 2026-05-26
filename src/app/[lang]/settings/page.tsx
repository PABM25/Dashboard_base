'use client';

import { useState } from 'react';
import { useTranslation, useLocale } from '@/components/LanguageProvider';

export default function Settings() {
  const dict = useTranslation();
  const locale = useLocale();
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert(dict.settings.savedSuccess);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{dict.settings.title}</h1>
          <p className="text-sm text-slate-500">{dict.settings.subtitle}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-8">
            {/* Profile Section */}
            <div>
              <h2 className="text-lg font-medium text-slate-900 mb-1">{dict.settings.profile}</h2>
              <p className="text-sm text-slate-500 mb-6">{dict.settings.profileDesc}</p>

              <div className="flex items-center gap-6 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-20 w-20 rounded-full border border-slate-200"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50">
                  Change Photo
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-slate-700 mb-2">
                    {dict.settings.firstName}
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    defaultValue="Tom"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-slate-700 mb-2">
                    {dict.settings.lastName}
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    defaultValue="Cook"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    {dict.settings.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="tom.cook@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                    {dict.settings.role}
                  </label>
                  <input
                    type="text"
                    id="role"
                    defaultValue="Administrator"
                    disabled
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Notifications Section */}
            <div>
              <h2 className="text-lg font-medium text-slate-900 mb-1">{dict.settings.notifications}</h2>
              <p className="text-sm text-slate-500 mb-6">{dict.settings.notificationsDesc}</p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-alerts"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2"
                    />
                  </div>
                  <label htmlFor="email-alerts" className="ml-3 text-sm font-medium text-slate-700">
                    {dict.settings.emailAlerts}
                  </label>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sms-alerts"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2"
                    />
                  </div>
                  <label htmlFor="sms-alerts" className="ml-3 text-sm font-medium text-slate-700">
                    {dict.settings.smsAlerts}
                  </label>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="weekly-reports"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2"
                    />
                  </div>
                  <label htmlFor="weekly-reports" className="ml-3 text-sm font-medium text-slate-700">
                    {dict.settings.weeklyReports}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? (locale === 'es' ? 'Guardando...' : 'Saving...') : dict.settings.saveChanges}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}