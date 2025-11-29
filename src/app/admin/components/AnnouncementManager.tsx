'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Announcement {
    id: string;
    imageUrl: string;
    title: string;
    text: string;
    link?: string;
}

interface AnnouncementManagerProps {
    initialAnnouncements: Announcement[];
}

export default function AnnouncementManager({ initialAnnouncements }: AnnouncementManagerProps) {
    const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
    const [formData, setFormData] = useState({ id: '', imageUrl: '', title: '', text: '', link: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.text) return;
        setIsSubmitting(true);

        try {
            const method = formData.id ? 'PUT' : 'POST';
            const res = await fetch('/api/announcements', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ id: '', imageUrl: '', title: '', text: '', link: '' });
                router.refresh();
                const updatedRes = await fetch('/api/announcements');
                const updatedData = await updatedRes.json();
                setAnnouncements(updatedData);
            }
        } catch (error) {
            console.error('Error saving announcement:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (item: Announcement) => {
        setFormData({
            id: item.id,
            imageUrl: item.imageUrl,
            title: item.title,
            text: item.text,
            link: item.link || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;

        try {
            const res = await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                router.refresh();
                setAnnouncements(announcements.filter(a => a.id !== id));
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    return (
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Announcements</h3>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label style={{ fontSize: '0.9rem', marginBottom: '0.25rem', display: 'block' }}>Link (URL)</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. /hakkimizda or https://example.com"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                </div>
                <textarea
                    className="form-control"
                    placeholder="Announcement Text"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={3}
                    required
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : (formData.id ? 'Update Announcement' : 'Add Announcement')}
                    </button>
                    {formData.id && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setFormData({ id: '', imageUrl: '', title: '', text: '', link: '' })}
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {announcements.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', alignItems: 'center' }}>
                        {item.imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.imageUrl} alt={item.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                        )}
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0' }}>{item.title}</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{item.text}</p>
                            {item.link && <p style={{ margin: 0, fontSize: '0.8rem', color: '#2563eb' }}>Link: {item.link}</p>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(item)} className="btn btn-secondary btn-sm">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
