'use client';

import { useTranslation } from '@/components/LanguageProvider';
import { HelpCircle, Mail } from 'lucide-react';

export default function Help() {
  const dict = useTranslation();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{dict.help.title}</h1>
          <p className="text-sm text-slate-500">{dict.help.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              {dict.help.faq}
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">{dict.help.faqQ1}</h3>
                <p className="text-sm text-slate-500">{dict.help.faqA1}</p>
              </div>
              <hr className="border-slate-100" />
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">{dict.help.faqQ2}</h3>
                <p className="text-sm text-slate-500">{dict.help.faqA2}</p>
              </div>
              <hr className="border-slate-100" />
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">{dict.help.faqQ3}</h3>
                <p className="text-sm text-slate-500">{dict.help.faqA3}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">{dict.help.contact}</h3>
            <p className="text-sm text-slate-500 mb-4">
              {dict.help.contactDesc}
            </p>
            <button className="w-full px-4 py-2 bg-indigo-600 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-indigo-700">
              support@enterpriseos.com
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}