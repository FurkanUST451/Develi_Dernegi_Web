import mongoose from 'mongoose';
import dbConnect from './db';

export interface Announcement {
    id: string;
    title: string;
    date: string;
    content: string;
    text: string; // Alias for content
    imageUrl: string;
    link?: string;
}

// Mongoose Schema
const AnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: false },
}, { timestamps: true });

// Check if model already exists to prevent overwrite error in dev mode
const AnnouncementModel = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);

export async function getAnnouncements(): Promise<Announcement[]> {
    await dbConnect();
    const announcements = await AnnouncementModel.find({}).sort({ date: -1 }); // Sort by date descending
    return announcements.map(doc => ({
        id: doc._id.toString(),
        title: doc.title,
        date: doc.date,
        content: doc.content,
        text: doc.content, // Map content to text
        imageUrl: doc.imageUrl,
        link: doc.link,
    }));
}

export async function addAnnouncement(announcement: Omit<Announcement, 'id' | 'text'>): Promise<void> {
    await dbConnect();
    await AnnouncementModel.create(announcement);
}

export async function updateAnnouncement(id: string, updates: Partial<Announcement>): Promise<void> {
    await dbConnect();
    await AnnouncementModel.findByIdAndUpdate(id, updates);
}

export async function deleteAnnouncement(id: string): Promise<void> {
    await dbConnect();
    await AnnouncementModel.findByIdAndDelete(id);
}
