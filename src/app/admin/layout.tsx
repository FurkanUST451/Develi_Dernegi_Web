'use client';

import AdminHeader from './components/AdminHeader';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname?.startsWith('/admin/login');

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="admin-layout">
            <AdminHeader />
            <main className="container admin-content">
                {children}
            </main>
        </div>
    );
}
