'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

export default function FadeInSection({ children }: { children: ReactNode }) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            });
        });

        const currentElement = domRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, []);

    return (
        <div
            ref={domRef}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : 'translateY(100px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                willChange: 'opacity, transform'
            }}
        >
            {children}
        </div>
    );
}
