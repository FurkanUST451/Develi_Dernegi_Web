import mongoose from 'mongoose';
import dbConnect from './db';

export interface HeroSlide {
    id: string;
    imageUrl: string;
}

// Mongoose Schema
const HeroSlideSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
}, { timestamps: true });

// Check if model already exists
const HeroSlideModel = mongoose.models.HeroSlide || mongoose.model('HeroSlide', HeroSlideSchema);

export async function getHeroSlides(): Promise<HeroSlide[]> {
    await dbConnect();
    const slides = await HeroSlideModel.find({}).sort({ createdAt: -1 });
    return slides.map(doc => ({
        id: doc._id.toString(),
        imageUrl: doc.imageUrl,
    }));
}

export async function addHeroSlide(imageUrl: string): Promise<void> {
    await dbConnect();
    await HeroSlideModel.create({ imageUrl });
}

export async function deleteHeroSlide(id: string): Promise<void> {
    await dbConnect();
    await HeroSlideModel.findByIdAndDelete(id);
}
