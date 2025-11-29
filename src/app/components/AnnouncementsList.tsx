'use client';

import { useRouter } from 'next/navigation';
import { Announcement } from '@/lib/announcements';

export default function AnnouncementsList({ announcements }: { announcements: Announcement[] }) {
    const router = useRouter();

    const handleCardClick = (link?: string) => {
        if (link) {
            if (link.startsWith('http')) {
                window.open(link, '_blank');
            } else {
                router.push(link);
            }
        }
    };

    if (announcements.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
                Henüz duyuru bulunmamaktadır.
            </div>
        );
    }

    return (
        <div className="announcements-list">
            {announcements.map((item, index) => (
                <div
                    key={item.id}
                    className="announcement-card"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={() => handleCardClick(item.link)}
                >
                    <div className="card-image-container">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="card-image"
                        />
                    </div>
                    <div className="card-content">
                        <h2 className="card-title">{item.title}</h2>
                        <p className="card-text">{item.text}</p>
                    </div>
                </div>
            ))}

            <style jsx>{`
                .announcements-list {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    padding: 2rem 0;
                }

                .announcement-card {
                    display: flex;
                    flex-direction: column;
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    opacity: 0;
                    animation: slideUpFade 0.8s ease-out forwards;
                    cursor: pointer;
                }

                .announcement-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.12);
                }

                .card-image-container {
                    width: 100%;
                    height: 250px;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .announcement-card:hover .card-image {
                    transform: scale(1.05);
                }

                .card-content {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .card-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: #1a1a1a;
                }

                .card-text {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #555;
                    flex: 1;
                }

                @keyframes slideUpFade {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Desktop Layout (Horizontal) */
                @media (min-width: 768px) {
                    .announcement-card {
                        flex-direction: row;
                        align-items: flex-start; /* Align top so text can grow */
                        min-height: 250px;
                    }

                    .card-image-container {
                        width: 300px; /* Fixed width */
                        height: 250px; /* Fixed height matching min-height */
                    }

                    .card-content {
                        width: auto;
                        flex: 1;
                    }
                    
                    .card-title {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
}
