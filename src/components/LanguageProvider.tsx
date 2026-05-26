'use client';

import React, { createContext, useContext, ReactNode } from 'react';

type Dictionary = Record<string, any>; // Consider typing this more strictly if needed

interface LanguageContextType {
  dictionary: Dictionary;
  locale: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  dictionary,
  locale,
}: {
  children: ReactNode;
  dictionary: Dictionary;
  locale: string;
}) {
  return (
    <LanguageContext.Provider value={{ dictionary, locale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context.dictionary;
}

export function useLocale() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LanguageProvider');
  }
  return context.locale;
}