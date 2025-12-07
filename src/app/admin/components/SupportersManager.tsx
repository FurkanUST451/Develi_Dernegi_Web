'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Supporter {
    id: string;
    imageUrl: string;
    name?: string;
    link?: string;
}

interface SupportersManagerProps {
    initialSupporters: Supporter[];
}

export default function SupportersManager({ initialSupporters }: SupportersManagerProps) {
    const [supporters, setSupporters] = useState<Supporter[]>(initialSupporters);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newName, setNewName] = useState('');
    const [newLink, setNewLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleAddSupporter = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImageUrl) return;
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/supporters', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imageUrl: newImageUrl,
                    name: newName,
                    link: newLink
                }),
            });

            if (res.ok) {
                setNewImageUrl('');
                setNewName('');
                setNewLink('');
                router.refresh();
                // Fetch fresh data
                const updatedRes = await fetch('/api/supporters');
                const updatedSupporters = await updatedRes.json();
                setSupporters(updatedSupporters);
            }
        } catch (error) {
            console.error('Error adding supporter:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSupporter = async (id: string) => {
        if (!confirm('Are you sure you want to delete this supporter?')) return;

        try {
            const res = await fetch(`/api/supporters?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                router.refresh();
                setSupporters(supporters.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error('Error deleting supporter:', error);
        }
    };

    return (
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Destekçilerimiz (Supporters)</h3>

            <form onSubmit={handleAddSupporter} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Logo URL (Required)"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    style={{ flex: 2, minWidth: '200px' }}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name (Optional)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{ flex: 1, minWidth: '150px' }}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Website Link (Optional)"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    style={{ flex: 1, minWidth: '150px' }}
                />
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Supporter'}
                </button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                {supporters.map(supporter => (
                    <div key={supporter.id} style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e2e8f0', padding: '0.5rem', background: '#f8f9fa' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={supporter.imageUrl} alt={supporter.name || "Supporter"} style={{ width: '100%', height: '80px', objectFit: 'contain', display: 'block', marginBottom: '0.5rem' }} />
                        {supporter.name && <div style={{ fontSize: '0.8rem', textAlign: 'center', fontWeight: 'bold' }}>{supporter.name}</div>}
                        <button
                            onClick={() => handleDeleteSupporter(supporter.id)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'rgba(239, 68, 68, 0.9)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px'
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
