import mongoose from 'mongoose';
import dbConnect from './db';

export interface Supporter {
    id: string;
    imageUrl: string;
    name?: string;
    link?: string;
}

// Mongoose Schema
const SupporterSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    name: { type: String, required: false },
    link: { type: String, required: false },
}, { timestamps: true });

// Check if model already exists to prevent overwrite error in dev mode
const SupporterModel = mongoose.models.Supporter || mongoose.model('Supporter', SupporterSchema);

export async function getSupporters(): Promise<Supporter[]> {
    await dbConnect();
    const supporters = await SupporterModel.find({}).sort({ createdAt: 1 }); // Sort by creation time
    return supporters.map(doc => ({
        id: doc._id.toString(),
        imageUrl: doc.imageUrl,
        name: doc.name,
        link: doc.link,
    }));
}

export async function addSupporter(supporter: Omit<Supporter, 'id'>): Promise<void> {
    await dbConnect();
    await SupporterModel.create(supporter);
}

export async function deleteSupporter(id: string): Promise<void> {
    await dbConnect();
    await SupporterModel.findByIdAndDelete(id);
}
