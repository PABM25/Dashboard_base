'use client';

import { Bell, Search, Globe } from 'lucide-react';
import { useTranslation, useLocale } from './LanguageProvider';
import { useRouter, usePathname } from 'next/navigation';

export function Header() {
  const dict = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const currentDate = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm bg-transparent outline-none"
            placeholder={dict.header.search}
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-x-2 border-r border-slate-200 pr-4">
             <Globe className="h-4 w-4 text-slate-400" />
             <select
               value={locale}
               onChange={handleLanguageChange}
               className="bg-transparent border-none text-sm font-medium text-slate-700 outline-none cursor-pointer hover:text-slate-900"
             >
               <option value="en">EN</option>
               <option value="es">ES</option>
             </select>
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