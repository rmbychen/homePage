import { locales, type Locale, getMessages } from '@/i18n';
import { notFound } from 'next/navigation';
import { LangSwitch } from '@/components/LangSwitch';
import { SetLang } from '@/components/SetLang';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const lang = locale as Locale;
  const messages = await getMessages(lang);
  const nav = (messages.nav as Record<string, string>) || {};
  return (
    <div className="site">
      <SetLang locale={lang} />
      <header className="site-header">
        <LangSwitch currentLocale={lang} label={nav.lang} />
      </header>
      <main className="site-main">{children}</main>
    </div>
  );
}
