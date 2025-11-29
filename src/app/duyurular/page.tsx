import { getAnnouncements } from '@/lib/announcements';
import AnnouncementsList from '../components/AnnouncementsList';

export const metadata = {
    title: 'Duyurular - Develi ve Yöresi Kültür Dayanışma Derneği',
    description: 'Derneğimizden en son haberler ve duyurular.',
};

export default async function AnnouncementsPage() {
    const announcements = await getAnnouncements();

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <AnnouncementsList announcements={announcements} />
        </div>
    );
}
