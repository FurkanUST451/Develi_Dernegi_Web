import mongoose from 'mongoose';
import dbConnect from './db';

export interface Member {
    id: string;
    name: string;
    job: string;
    bio: string;
    year: string;
    imageUrl: string;
}

// Mongoose Schema
const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    job: { type: String, required: true },
    bio: { type: String, required: true },
    year: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

// Check if model already exists to prevent overwrite error in dev mode
const MemberModel = mongoose.models.Member || mongoose.model('Member', MemberSchema);

export async function getMembers(): Promise<Member[]> {
    await dbConnect();
    const members = await MemberModel.find({}).sort({ createdAt: -1 });
    return members.map(doc => ({
        id: doc._id.toString(),
        name: doc.name,
        job: doc.job,
        bio: doc.bio,
        year: doc.year,
        imageUrl: doc.imageUrl,
    }));
}

export async function addMember(member: Omit<Member, 'id'>): Promise<void> {
    await dbConnect();
    await MemberModel.create(member);
}

export async function updateMember(id: string, updates: Partial<Member>): Promise<void> {
    await dbConnect();
    await MemberModel.findByIdAndUpdate(id, updates);
}

export async function deleteMember(id: string): Promise<void> {
    await dbConnect();
    await MemberModel.findByIdAndDelete(id);
}
