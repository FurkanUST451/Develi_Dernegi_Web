'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-xl font-bold text-gray-800">
                        Admin Panel
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                        Siteyi Görüntüle
                    </Link>
                </div>

                <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                >
                    Çıkış Yap
                </button>
            </div>
        </header>
    );
}
