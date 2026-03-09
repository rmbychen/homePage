import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const localeInPath = pathname.split('/')[1];
  if (locales.includes(localeInPath as 'zh' | 'en')) {
    return NextResponse.next();
  }
  const locale = defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|favicon|avatar).*)'],
};
