'use client';

import { useState, useRef, useEffect } from 'react';

interface HeroSlide {
    id: string;
    imageUrl: string;
}

export default function HeroSlider({ slides, heroText }: { slides: HeroSlide[], heroText: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Process heroText into words, preserving newlines as <br/>
    const words = heroText.replace(/\n/g, ' <br/> ').split(' ');

    // Fallback if no slides
    const displaySlides = slides.length > 0 ? slides : [
        { id: 'default', imageUrl: 'https://cdnp.flypgs.com/files/Sehirler-long-tail/Kayseri/kayseri-gezi-rehberi.jpg' }
    ];

    useEffect(() => {
        // Reset translation when index changes (handled by transition)
        setCurrentTranslate(currentIndex * -100);
        setPrevTranslate(currentIndex * -100);
    }, [currentIndex]);

    // Auto-play
    useEffect(() => {
        if (isDragging) return; // Pause while dragging

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isDragging, displaySlides.length]);

    const nextSlide = () => {
        if (currentIndex < displaySlides.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Loop back to start
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(displaySlides.length - 1); // Loop to end
        }
    };

    // Drag Handlers
    const touchStart = (event: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        setStartPos(clientX);
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grabbing';
        }
    };

    const touchMove = (event: React.TouchEvent | React.MouseEvent) => {
        if (isDragging) {
            const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
            const currentPosition = clientX;
            const diff = currentPosition - startPos;
            // Calculate percentage moved based on container width
            const containerWidth = sliderRef.current?.offsetWidth || 1;
            const movePercent = (diff / containerWidth) * 100;
            setCurrentTranslate(prevTranslate + movePercent);
        }
    };

    const touchEnd = () => {
        setIsDragging(false);
        const movedBy = currentTranslate - prevTranslate;

        // Threshold to change slide (e.g., 15% of width)
        if (movedBy < -15) {
            nextSlide();
        } else if (movedBy > 15) {
            prevSlide();
        } else {
            // Snap back
            setCurrentTranslate(currentIndex * -100);
        }

        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grab';
        }
    };

    return (
        <div className="hero-container" style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '100px',
            paddingBottom: '2rem'
        }}>
            <div className="hero"
                ref={sliderRef}
                onMouseDown={touchStart}
                onMouseMove={touchMove}
                onMouseUp={touchEnd}
                onMouseLeave={() => { if (isDragging) touchEnd() }}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEnd={touchEnd}
                style={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: '1400px',
                    height: '80vh',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)',
                    transform: 'perspective(1000px) rotateX(1deg)',
                    transition: 'transform 0.3s ease',
                    cursor: 'grab',
                    userSelect: 'none' // Prevent text selection while dragging
                }}>
                <div className="slider-track" style={{
                    display: 'flex',
                    height: '100%',
                    width: `${displaySlides.length * 100}%`,
                    transform: `translateX(${(isDragging ? currentTranslate : currentIndex * -100) / displaySlides.length}%)`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-out'
                }}>
                    {displaySlides.map((slide, index) => (
                        <div key={slide.id} style={{
                            width: `${100 / displaySlides.length}%`, // Each slide takes 1/N of the track width
                            height: '100%',
                            flexShrink: 0,
                            position: 'relative'
                        }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={slide.imageUrl}
                                alt="Hero"
                                draggable={false}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.9)' }}
                            />
                            {/* Dark Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0, 0, 0, 0.4)',
                                pointerEvents: 'none'
                            }}></div>
                        </div>
                    ))}
                </div>

                <style jsx>{`
                    @keyframes slideDown {
                        from {
                            transform: translateY(-50px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    @keyframes slideUp {
                        from {
                            transform: translateY(30px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .slider-button {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(5px);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        font-size: 20px;
                        transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                        z-index: 10;
                        outline: none;
                        opacity: 0;
                        animation: fadeIn 0.5s ease-out 0.5s forwards;
                    }
                    .slider-button:hover {
                        background: white;
                        color: black;
                        transform: translateY(-50%) scale(1.1);
                        box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                    }
                    .prev-button {
                        left: 30px;
                    }
                    .next-button {
                        right: 30px;
                    }
                `}</style>

                {/* Hero Text Overlay - kept outside the track to stay static */}
                <div className="hero-text" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                    width: '80%',
                    zIndex: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    pointerEvents: 'none'
                }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        lineHeight: 1.2,
                        letterSpacing: '1px'
                    }}>
                        {words.map((word, index) => (
                            <span
                                key={index}
                                style={{
                                    display: 'inline-block',
                                    marginRight: '0.5rem',
                                    opacity: 0,
                                    animation: `slideDown 0.8s ease-out ${index * 0.3}s forwards`
                                }}
                            >
                                {word === '<br/>' ? <br /> : word}
                            </span>
                        ))}
                    </h1>

                    <div style={{
                        width: '40%',
                        height: '2px',
                        background: 'white',
                        margin: '0 auto 1rem auto',
                        opacity: 0,
                        animation: 'slideUp 0.8s ease-out 2s forwards'
                    }}></div>

                    <p style={{
                        fontSize: '1.5rem',
                        fontWeight: 300,
                        fontStyle: 'italic',
                        opacity: 0,
                        animation: 'slideUp 0.8s ease-out 2.3s forwards'
                    }}>
                        "Birlikte Develi"
                    </p>
                </div>

                {displaySlides.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            className="slider-button prev-button"
                        >
                            ❮
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                            className="slider-button next-button"
                        >
                            ❯
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
