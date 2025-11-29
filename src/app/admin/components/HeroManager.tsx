'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeroSlide {
    id: string;
    imageUrl: string;
}

interface HeroManagerProps {
    initialSlides: HeroSlide[];
}

export default function HeroManager({ initialSlides }: HeroManagerProps) {
    const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleAddSlide = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImageUrl) return;
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/hero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: newImageUrl }),
            });

            if (res.ok) {
                setNewImageUrl('');
                router.refresh();
                // Optimistic update or fetch fresh data
                const updatedRes = await fetch('/api/hero');
                const updatedSlides = await updatedRes.json();
                setSlides(updatedSlides);
            }
        } catch (error) {
            console.error('Error adding slide:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSlide = async (id: string) => {
        if (!confirm('Are you sure you want to delete this slide?')) return;

        try {
            const res = await fetch(`/api/hero?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                router.refresh();
                setSlides(slides.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error('Error deleting slide:', error);
        }
    };

    return (
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Hero Slider Images</h3>

            <form onSubmit={handleAddSlide} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Slide'}
                </button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {slides.map(slide => (
                    <div key={slide.id} style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={slide.imageUrl} alt="Slide" style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
                        <button
                            onClick={() => handleDeleteSlide(slide.id)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'rgba(239, 68, 68, 0.9)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
