import { createSupabaseServer } from './lib/server-supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const publicPaths = ['/login', '/register', '/'];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  const supabase = await createSupabaseServer();

  const { data } = await supabase.auth.getSession();

  if (!data.session?.access_token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Виключаємо з перевірки всі шляхи, що починаються з:
     * - api (API роути)
     * - _next/static (статика)
     * - _next/image (оптимізовані картинки)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
