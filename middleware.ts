import { NextRequest, NextResponse } from 'next/server';

const protectedPages = ['/my', '/like', '/onboarding'];
const adminProtectedPages = ['/admin/studio', '/admin/product'];

const notProtectedPage = '/login';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const adminToken = request.cookies.get('adminAccessToken');
  const { pathname } = request.nextUrl;

  const isProtectedPage = protectedPages.some(path => pathname.startsWith(path));
  const isProtectedAdminPage = adminProtectedPages.some(path => pathname.startsWith(path));

  const isNotProtectedPage = pathname.startsWith(notProtectedPage) ? true : false;

  // 로그인 안 했을 시, 접근 불가 처리
  if (!token && isProtectedPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // if (!adminToken && isProtectedAdminPage) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/admin';
  //   return NextResponse.redirect(url);
  // }

  // 로그인 했을 시, 접근 불가 처리
  if (token && isNotProtectedPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};
