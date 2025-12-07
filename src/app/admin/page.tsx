import { getPages } from "@/lib/storage";
import { getSettings } from "@/lib/settings";
import { getHeroSlides } from "@/lib/hero";
import { getAnnouncements } from "@/lib/announcements";
import { getMembers } from "@/lib/members";
import { getSupporters } from "@/lib/supporters";
import Link from "next/link";
import AdminPageList from "./components/AdminPageList";
import SettingsForm from "./components/SettingsForm";
import HeroManager from "./components/HeroManager";
import AnnouncementManager from "./components/AnnouncementManager";
import MembersManager from "./components/MembersManager";
import SupportersManager from "./components/SupportersManager";

export default async function AdminDashboard() {
    const pages = await getPages();
    const settings = await getSettings();
    const heroSlides = await getHeroSlides();
    const announcements = await getAnnouncements();
    const members = await getMembers();
    const supporters = await getSupporters();

    return (
        <div>
            <div className="admin-header-actions">
                <h2>Dashboard</h2>
                <Link href="/admin/new" className="btn btn-primary">Add New Page</Link>
            </div>

            <SettingsForm initialLogoUrl={settings.logoUrl} initialHeroText={settings.heroText} />

            <HeroManager initialSlides={heroSlides} />

            <AnnouncementManager initialAnnouncements={announcements} />

            <MembersManager initialMembers={members} />

            <SupportersManager initialSupporters={supporters} />

            <h3 style={{ marginBottom: '1rem' }}>Pages</h3>
            <AdminPageList initialPages={pages} />
        </div>
    );
}
