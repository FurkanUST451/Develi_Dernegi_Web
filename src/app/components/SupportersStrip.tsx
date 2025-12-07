'use client';

import { useEffect, useRef, useState } from 'react';

interface Supporter {
    id: string;
    imageUrl: string;
    name?: string;
    link?: string;
}

interface SupportersStripProps {
    supporters: Supporter[];
}

export default function SupportersStrip({ supporters }: SupportersStripProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const animationRef = useRef<number | null>(null);

    if (!supporters || supporters.length === 0) return null;

    // Duplicate supporters to create seamless loop
    // We need enough duplicates to fill the screen and allow for smooth scrolling
    // Using 30 copies to ensure it covers even very wide screens and allows for the reset logic to work
    const duplicatedSupporters = Array(30).fill(supporters).flat();

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scroll = () => {
            if (!isDragging && scrollContainer) {
                // Auto scroll speed (adjust this value to change speed)
                const speed = 0.5; // Reduced speed as requested

                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    // Reset to start when we've scrolled halfway (since we duplicated content)
                    // This assumes we have enough content duplicated. 
                    // A safer check is scrollWidth - clientWidth, but for infinite loop logic:
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += speed;
                }
            }
            animationRef.current = requestAnimationFrame(scroll);
        };

        animationRef.current = requestAnimationFrame(scroll);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2; // Scroll-fast
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <section style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '1.5rem 0',
            width: '100%',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div className="container">
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: "'Playfair Display', serif",
                    userSelect: 'none' // Prevent text selection while dragging
                }}>
                    Destekçilerimiz
                </h2>

                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        display: 'flex',
                        gap: '4rem',
                        overflowX: 'hidden', // Hide scrollbar but allow JS scroll
                        cursor: isDragging ? 'grabbing' : 'grab',
                        whiteSpace: 'nowrap',
                        paddingBottom: '10px' // Buffer
                    }}
                >
                    {duplicatedSupporters.map((supporter, index) => (
                        <div key={`${supporter.id}-${index}`} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            filter: 'grayscale(100%) brightness(200%)',
                            transition: 'all 0.3s ease',
                            opacity: 0.7,
                            flexShrink: 0,
                            userSelect: 'none' // Prevent image selection
                        }}
                            onMouseEnter={(e) => {
                                if (!isDragging) {
                                    e.currentTarget.style.filter = 'grayscale(0%) brightness(100%)';
                                    e.currentTarget.style.opacity = '1';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.filter = 'grayscale(100%) brightness(200%)';
                                e.currentTarget.style.opacity = '0.7';
                            }}
                            onClick={(e) => {
                                // Prevent click if we were dragging
                                if (!isDragging && supporter.link) {
                                    window.open(supporter.link, '_blank');
                                }
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={supporter.imageUrl}
                                alt={supporter.name || 'Supporter'}
                                style={{
                                    maxHeight: '50px',
                                    maxWidth: '150px',
                                    objectFit: 'contain',
                                    pointerEvents: 'none' // Prevent default image drag
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
