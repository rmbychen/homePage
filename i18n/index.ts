export type Locale = 'zh' | 'en';

export const locales: Locale[] = ['zh', 'en'];
export const defaultLocale: Locale = 'zh';

export async function getMessages(locale: Locale): Promise<Record<string, unknown>> {
  const mod = locale === 'en' ? await import('./locales/en.json') : await import('./locales/zh.json');
  return (mod.default ?? mod) as Record<string, unknown>;
}
