'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SettingsFormProps {
    initialLogoUrl: string;
    initialHeroText: string;
}

export default function SettingsForm({ initialLogoUrl, initialHeroText }: SettingsFormProps) {
    const [logoUrl, setLogoUrl] = useState(initialLogoUrl);
    const [heroText, setHeroText] = useState(initialHeroText);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ logoUrl, heroText }),
            });

            if (response.ok) {
                router.refresh();
                alert('Settings saved successfully!');
            } else {
                alert('Failed to save settings.');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('An error occurred.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Site Settings</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="logoUrl">Logo URL</label>
                    <input
                        type="text"
                        id="logoUrl"
                        className="form-control"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="https://example.com/logo.png"
                    />
                    <small style={{ color: '#64748b', display: 'block', marginTop: '0.25rem' }}>
                        Enter the full URL of your logo image.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="heroText">Hero Text</label>
                    <textarea
                        id="heroText"
                        className="form-control"
                        value={heroText}
                        onChange={(e) => setHeroText(e.target.value)}
                        placeholder="Develi ve Yöresi Kültür Dayanışma Derneği"
                        rows={3}
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </div>
    );
}
