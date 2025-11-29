'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Member } from '@/lib/members';

interface MembersManagerProps {
    initialMembers: Member[];
}

export default function MembersManager({ initialMembers }: MembersManagerProps) {
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [formData, setFormData] = useState<Partial<Member>>({
        id: '',
        name: '',
        job: '',
        bio: '',
        year: '',
        imageUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.job) return;
        setIsSubmitting(true);

        try {
            const method = formData.id ? 'PUT' : 'POST';
            const res = await fetch('/api/members', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ id: '', name: '', job: '', bio: '', year: '', imageUrl: '' });
                router.refresh();
                const updatedRes = await fetch('/api/members');
                const updatedData = await updatedRes.json();
                setMembers(updatedData);
            }
        } catch (error) {
            console.error('Error saving member:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (item: Member) => {
        setFormData({ ...item });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return;

        try {
            const res = await fetch(`/api/members?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                router.refresh();
                setMembers(members.filter(m => m.id !== id));
            }
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    return (
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Members (Üyelerimiz)</h3>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image URL"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name (Ad Soyad)"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Job (Meslek)"
                        value={formData.job || ''}
                        onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Year Text (e.g. 2015 Yılından Beri Üye)"
                        value={formData.year || ''}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <textarea
                        className="form-control"
                        placeholder="Biography (Max 250 characters)"
                        value={formData.bio || ''}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                        maxLength={250}
                    />
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: (formData.bio?.length || 0) > 230 ? 'red' : '#666' }}>
                        {formData.bio?.length || 0}/250
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : (formData.id ? 'Update Member' : 'Add Member')}
                    </button>
                    {formData.id && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setFormData({ id: '', name: '', job: '', bio: '', year: '', imageUrl: '' })}
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {members.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', alignItems: 'center' }}>
                        {item.imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0' }}>{item.name} <span style={{ fontSize: '0.8rem', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{item.job}</span></h4>
                            <p style={{
                                margin: '0 0 0.5rem 0',
                                fontSize: '0.9rem',
                                color: '#555',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                wordBreak: 'break-word'
                            }}>{item.bio}</p>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{item.year}</p>
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
