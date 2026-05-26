'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Globe, ChevronDown } from 'lucide-react';
import { useTranslation, useLocale } from './LanguageProvider';
import { useRouter, usePathname } from 'next/navigation';

export function Header() {
  const dict = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langRef]);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsLangOpen(false);
  };

  const currentDate = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 justify-end">
      <div className="flex gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="relative flex items-center gap-x-2 border-r border-slate-200 pr-4" ref={langRef}>
             <button
               onClick={() => setIsLangOpen(!isLangOpen)}
               className="flex items-center gap-x-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors focus:outline-none"
             >
               <Globe className="h-4 w-4 text-slate-400" />
               <span className="uppercase">{locale}</span>
               <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
             </button>

             {isLangOpen && (
               <div className="absolute top-full right-4 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 py-1">
                 <button
                   onClick={() => handleLanguageChange('en')}
                   className={`block w-full text-left px-4 py-2 text-sm transition-colors ${locale === 'en' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                 >
                   English
                 </button>
                 <button
                   onClick={() => handleLanguageChange('es')}
                   className={`block w-full text-left px-4 py-2 text-sm transition-colors ${locale === 'es' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                 >
                   Español
                 </button>
               </div>
             )}
          </div>
          <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500">
            <span className="sr-only">{dict.header.viewNotifications}</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true" />
          <div className="text-sm font-medium leading-6 text-slate-900 capitalize">
            {currentDate}
          </div>
        </div>
      </div>
    </header>
  );
}