'use client';

import { usePathname } from 'next/navigation';

import AnimationController from './AnimationController';

export default function LayoutWrapper({
    children,
    publicLayout,
}: {
    children: React.ReactNode;
    publicLayout: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <AnimationController />
            {publicLayout}
        </>
    );
}
