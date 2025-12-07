'use client';

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
    if (!supporters || supporters.length === 0) return null;

    return (
        <section style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '3rem 0',
            width: '100%',
            overflow: 'hidden'
        }}>
            <div className="container">
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    fontSize: '2rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Destekçilerimiz
                </h2>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '3rem'
                }}>
                    {supporters.map((supporter) => (
                        <div key={supporter.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            filter: 'grayscale(100%) brightness(200%)', // Make logos white/grayscale
                            transition: 'all 0.3s ease',
                            opacity: 0.7,
                            cursor: supporter.link ? 'pointer' : 'default'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.filter = 'grayscale(0%) brightness(100%)'; // Restore color on hover
                                e.currentTarget.style.opacity = '1';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.filter = 'grayscale(100%) brightness(200%)';
                                e.currentTarget.style.opacity = '0.7';
                            }}
                            onClick={() => {
                                if (supporter.link) {
                                    window.open(supporter.link, '_blank');
                                }
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={supporter.imageUrl}
                                alt={supporter.name || 'Supporter'}
                                style={{
                                    maxHeight: '60px',
                                    maxWidth: '150px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
