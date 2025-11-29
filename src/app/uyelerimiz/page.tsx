import { getMembers } from "@/lib/members";

export default async function MembersPage() {
    const members = await getMembers();

    return (
        <div className="develi-icerik-alani">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            <style dangerouslySetInnerHTML={{
                __html: `
                /* Font Ayarları */
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

                /* GENEL KAPLAYICI */
                .develi-icerik-alani {
                    font-family: 'Open Sans', sans-serif;
                    color: #333;
                    background-color: #f5f7fa; 
                    width: 100%;
                    box-sizing: border-box;
                    padding: 60px 20px;
                }

                .develi-icerik-alani * {
                    box-sizing: border-box;
                }

                /* ANIMASYON */
                @keyframes fadeInSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .dy-sayfa-baslik-container {
                    animation: fadeInSlideUp 0.8s ease-out forwards;
                }

                /* BAŞLIK ALANI */
                .dy-sayfa-baslik-container {
                    text-align: center;
                    margin-bottom: 50px;
                    margin-top: 40px;
                    position: relative;
                }

                .dy-sayfa-baslik {
                    font-family: 'Playfair Display', serif;
                    font-size: 42px;
                    color: #000;
                    margin: 0;
                    position: relative;
                    display: inline-block;
                    padding-bottom: 15px;
                }

                .dy-sayfa-baslik::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #1a4d8c, transparent);
                }

                .dy-sayfa-alt-baslik {
                    font-size: 16px;
                    color: #666;
                    margin-top: 10px;
                    font-style: italic;
                }

                /* GRID YAPISI */
                .dy-uyeler-grid {
                    display: grid;
                    /* Kartlar en az 550px genişliğinde olsun */
                    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr)); 
                    gap: 30px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* KART TASARIMI */
                .dy-uye-liste-karti {
                    background: #fff;
                    border-radius: 16px;
                    padding: 25px;
                    display: flex;
                    align-items: flex-start;
                    gap: 25px; 
                    border: 1px solid #eaeaea;
                    transition: all 0.3s ease;
                    position: relative;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.02);
                }

                .dy-uye-liste-karti:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.08);
                    border-color: #dceefc;
                }

                /* FOTOĞRAF (DİKDÖRTGEN) */
                .dy-uye-foto {
                    flex-shrink: 0;
                    width: 160px; 
                    height: 160px; 
                    border-radius: 12px;
                    object-fit: cover;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
                }

                /* SAĞ TARAF (BİLGİLER) */
                .dy-uye-detay {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    min-height: 160px;
                }

                /* İsim ve Meslek */
                .dy-uye-baslik-satiri {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .dy-uye-ad {
                    font-family: 'Playfair Display', serif;
                    font-size: 22px;
                    font-weight: 700;
                    color: #222;
                    margin: 0;
                }

                .dy-meslek-pill {
                    font-size: 12px;
                    font-weight: 700;
                    background-color: #1a4d8c;
                    color: #fff;
                    padding: 6px 14px;
                    border-radius: 6px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                /* Biyografi Metni */
                .dy-uye-bio {
                    font-size: 15px;
                    color: #555;
                    line-height: 1.6;
                    margin-bottom: 15px;
                    display: -webkit-box;
                    -webkit-line-clamp: 4; 
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }

                /* Alt Bilgi (Yıl) */
                .dy-uye-footer {
                    border-top: 1px solid #f0f0f0;
                    padding-top: 15px;
                    display: flex;
                    align-items: center;
                    color: #888;
                    margin-top: auto;
                }

                .dy-uye-yil {
                    font-size: 13px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .dy-uye-yil i {
                    color: #1a4d8c;
                }



                /* MOBİL UYUM */
                @media (max-width: 700px) {
                    .dy-uyeler-grid {
                        grid-template-columns: 1fr;
                    }
                    .dy-uye-liste-karti {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                    .dy-uye-foto {
                        width: 100%;
                        height: 250px;
                        max-width: 400px;
                    }
                    .dy-uye-baslik-satiri {
                        flex-direction: column;
                        justify-content: center;
                        margin-top: 15px;
                    }
                    .dy-uye-footer {
                        justify-content: center;
                        width: 100%;
                    }
                }
            `}} />

            <div className="dy-sayfa-baslik-container">
                <h1 className="dy-sayfa-baslik">Kıymetli Üyelerimiz</h1>
                <p className="dy-sayfa-alt-baslik">Derneğimize değer katan yol arkadaşlarımız</p>
            </div>

            <div className="dy-uyeler-grid">
                {members.map(member => (
                    <div key={member.id} className="dy-uye-liste-karti">
                        <img src={member.imageUrl} className="dy-uye-foto" alt={member.name} />
                        <div className="dy-uye-detay">
                            <div className="dy-uye-baslik-satiri">
                                <h3 className="dy-uye-ad">{member.name}</h3>
                                <span className="dy-meslek-pill">{member.job}</span>
                            </div>
                            <p className="dy-uye-bio">{member.bio}</p>
                            <div className="dy-uye-footer">
                                <span className="dy-uye-yil"><i className="far fa-calendar-alt"></i> {member.year}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



        </div>
    );
}
