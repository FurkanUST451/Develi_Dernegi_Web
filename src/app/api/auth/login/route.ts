import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (username === adminUsername && password === adminPassword) {
            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, message: 'Geçersiz kullanıcı adı veya şifre' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Bir hata oluştu' },
            { status: 500 }
        );
    }
}
