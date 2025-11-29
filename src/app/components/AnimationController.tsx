'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnimationController() {
    const pathname = usePathname();

    useEffect(() => {
        // Function to setup observer
        const setupObserver = () => {
            const observerOptions = {
                root: null,
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('dy-animasyon-aktif');
                        // Also handle animation-play-state for other animations
                        if ((entry.target as HTMLElement).style.animationPlayState !== undefined) {
                            (entry.target as HTMLElement).style.animationPlayState = 'running';
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Select elements to animate
            // We target both the specific class and any element with the animation-play-state style
            const targets = document.querySelectorAll('.dy-animasyon-bekle, .dy-animasyonlu-baslik');
            targets.forEach(target => {
                observer.observe(target);
            });
        };

        // Run setup immediately
        setupObserver();

        // Also run after a short delay to ensure content is rendered
        const timeoutId = setTimeout(setupObserver, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [pathname]); // Re-run when pathname changes

    return null; // This component renders nothing
}
