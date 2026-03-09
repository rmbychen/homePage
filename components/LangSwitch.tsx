'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n';

type NavMessages = { lang: string };

export function LangSwitch({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label?: string;
}) {
  const nextLocale = currentLocale === 'zh' ? 'en' : 'zh';
  const text = label ?? (currentLocale === 'zh' ? 'English' : '中文');
  return (
    <Link href={`/${nextLocale}`} className="lang-switch">
      {text}
    </Link>
  );
}
