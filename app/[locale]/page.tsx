import { getMessages } from '@/i18n';
import type { Locale } from '@/i18n';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Chat } from '@/components/Chat';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const meta = (messages.meta as Record<string, string>) || {};
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const messages = await getMessages(lang);
  return (
    <>
      <Hero messages={messages} name="陈亮" locale={locale} />
      <About messages={messages} />
      <Chat messages={messages} locale={locale} />
    </>
  );
}
