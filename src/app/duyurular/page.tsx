import { getAnnouncements } from '@/lib/announcements';
import AnnouncementsList from '../components/AnnouncementsList';

export const metadata = {
    title: 'Duyurular - Develi ve Yöresi Kültür Dayanışma Derneği',
};

export const dynamic = 'force-dynamic';

export default async function AnnouncementsPage() {
    const announcements = await getAnnouncements();

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <AnnouncementsList announcements={announcements} />
        </div>
    );
}
