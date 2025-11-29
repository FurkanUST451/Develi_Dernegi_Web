'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Announcement {
    id: string;
    imageUrl: string;
    title: string;
    text: string;
    link?: string;
}

export default function AnnouncementSlider({ announcements }: { announcements: Announcement[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const isDown = useRef(false);
    const hasDragged = useRef(false);
    const router = useRouter();

    // Fallback if no announcements
    const displayAnnouncements = announcements.length > 0 ? announcements : [
        { id: '1', imageUrl: 'https://picsum.photos/400/200?random=1', title: 'Yeni Üyelik Dönemi', text: '2025 yılı dernek üyelik başvurularımız başlamıştır.' },
        { id: '2', imageUrl: 'https://picsum.photos/400/200?random=2', title: 'Kültür Şenliği', text: 'Haziran ayında gerçekleşecek şenlik hazırlıkları başladı.' },
        { id: '3', imageUrl: 'https://picsum.photos/400/200?random=3', title: 'Gençlik Kampı', text: 'Gençlik kampı kayıtlarımız açıldı.' },
        { id: '4', imageUrl: 'https://picsum.photos/400/200?random=4', title: 'Bağış Kampanyası', text: 'Yeni sosyal tesis için bağış kampanyamız devam ediyor.' },
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 340; // Card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Drag Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isDown.current = true;
        hasDragged.current = false;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = 'grabbing';
        scrollRef.current.style.scrollBehavior = 'auto';
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        setIsDragging(false);
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab';
            scrollRef.current.style.scrollBehavior = 'smooth';
        }
    };

    const handleMouseUp = () => {
        isDown.current = false;
        setTimeout(() => setIsDragging(false), 50); // Small delay to prevent click after drag
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab';
            scrollRef.current.style.scrollBehavior = 'smooth';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1;

        // Only consider it a drag if moved more than 5px
        if (Math.abs(walk) > 5) {
            hasDragged.current = true;
            setIsDragging(true);
            scrollRef.current.scrollLeft = scrollLeft.current - walk;
        }
    };

    const handleCardClick = (link?: string) => {
        if (!hasDragged.current && link) {
            if (link.startsWith('http')) {
                window.open(link, '_blank');
            } else {
                router.push(link);
            }
        }
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden', padding: '10px 0' }}>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .nav-button {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: #02475e;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 20px;
                    transition: all 0.3s ease;
                    z-index: 10;
                    outline: none;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-out 0.5s forwards;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                }
                .nav-button:hover {
                    background: black;
                    color: white;
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                }
                .prev-button { left: 10px; }
                .next-button { right: 10px; }
                
                .read-more {
                    color: #000000;
                    font-weight: 600;
                    font-size: 0.9rem;
                    margin-top: auto; /* Push to bottom */
                    display: inline-block;
                    transition: color 0.2s;
                }
                .read-more:hover {
                    color: #333333;
                    text-decoration: underline;
                }
                .text-fade {
                    position: relative;
                    flex: 1; /* Fill available space */
                    overflow: hidden;
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                }
                .text-fade::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2.5rem; /* Increased height to make blur visible again */
                    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
                    pointer-events: none;
                }
            `}</style>

            <button
                onClick={() => scroll('left')}
                className="nav-button prev-button"
            >
                ❮
            </button>

            <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{
                    display: 'flex',
                    gap: '20px',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    cursor: 'grab',
                    userSelect: 'none'
                }}
                className="hide-scrollbar"
            >
                {displayAnnouncements.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleCardClick(item.link || '/duyurular')}
                        style={{
                            minWidth: '320px',
                            maxWidth: '320px',
                            height: '480px', // Increased height
                            flex: '0 0 320px',
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                            overflow: 'hidden',
                            transition: 'transform 0.25s ease',
                            pointerEvents: isDragging ? 'none' : 'auto',
                            cursor: item.link ? 'pointer' : 'default'
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            draggable={false}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} // Slightly taller image
                        />
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 200px)' }}>
                            <h5 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>{item.title}</h5>
                            <p className="text-fade">{item.text}</p>
                            {(item.link || '/duyurular') && (
                                <span className="read-more">
                                    Devamını Oku &rarr;
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                className="nav-button next-button"
            >
                ❯
            </button>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
