import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AppLayout } from "@/components/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EnterpriseOS - Integrated Business Dashboard",
  description: "Professional dashboard for inventory, sales, and HR",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className="h-full bg-slate-50">
      <body className={`${inter.className} h-full overflow-hidden flex`}>
        <LanguageProvider dictionary={dictionary} locale={lang}>
          <AppLayout>
            {children}
          </AppLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}