import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  ...routing,
  localeDetection: false, // ブラウザ言語による自動リダイレクトを無効化
});

export const config = {
  matcher: [
    // next-intl が処理すべきパスのみ対象
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
