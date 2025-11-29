import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPath = request.nextUrl.pathname === '/admin/login';
    const hasSession = request.cookies.has('admin_session');

    if (isAdminPath) {
        if (isLoginPath) {
            // If already logged in and trying to access login page, redirect to admin dashboard
            if (hasSession) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            // Allow access to login page
            return NextResponse.next();
        }

        // Protect other admin routes
        if (!hasSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
