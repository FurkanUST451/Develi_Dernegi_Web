import { getHeroSlides } from "@/lib/hero";
import { getAnnouncements } from "@/lib/announcements";
import { getSettings } from "@/lib/settings";
import { getPages } from "@/lib/storage";
import { getSupporters } from "@/lib/supporters";
import HeroSlider from "./components/HeroSlider";
import AnnouncementSlider from "./components/AnnouncementSlider";
import SupportersStrip from "./components/SupportersStrip";

import FadeInSection from "./components/FadeInSection";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const heroSlides = await getHeroSlides();
  const announcements = await getAnnouncements();
  const settings = await getSettings();
  const pages = await getPages();
  const supporters = await getSupporters();
  const homePage = pages.find(p => p.slug === 'home');

  // Helper for dots
  const Dots = ({ reverse = false }) => (
    <div style={{ display: 'flex', gap: '4px', flexDirection: reverse ? 'row-reverse' : 'row', alignItems: 'center' }}>
      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ccc' }}></div>
      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#ccc', opacity: 0.7 }}></div>
      <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: '#ccc', opacity: 0.4 }}></div>
    </div>
  );

  return (
    <div>
      <HeroSlider slides={heroSlides} heroText={settings.heroText} />

      {homePage && homePage.content && (
        <section className="container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <div className="page-content" dangerouslySetInnerHTML={{ __html: homePage.content }} />
        </section>
      )}

      <SupportersStrip supporters={supporters} />

      <section className="container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <FadeInSection>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end', maxWidth: '250px' }}>
              <div style={{ height: '1px', background: '#ccc', flex: 1, margin: '0 1rem' }}></div>
              <Dots reverse={false} />
            </div>

            <h2 className="section-title" style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'black',
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: '0 1.5rem'
            }}>
              Son Haberler
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-start', maxWidth: '250px' }}>
              <Dots reverse={true} />
              <div style={{ height: '1px', background: '#ccc', flex: 1, margin: '0 1rem' }}></div>
            </div>
          </div>
          <AnnouncementSlider announcements={announcements} />
        </FadeInSection>
      </section>
    </div>
  );
}
