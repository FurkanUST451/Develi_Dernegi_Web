import mongoose from 'mongoose';
import dbConnect from './db';

export interface SiteSettings {
    logoUrl: string;
    heroText: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
    logoUrl: '',
    heroText: 'DEVELİ VE YÖRESİ\nKÜLTÜR DAYANIŞMA DERNEĞİ',
};

// Mongoose Schema
const SettingsSchema = new mongoose.Schema({
    logoUrl: { type: String, default: '' },
    heroText: { type: String, default: 'DEVELİ VE YÖRESİ\nKÜLTÜR DAYANIŞMA DERNEĞİ' },
}, { timestamps: true });

// Check if model already exists
const SettingsModel = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

export async function getSettings(): Promise<SiteSettings> {
    await dbConnect();
    const settings = await SettingsModel.findOne({});
    if (!settings) {
        return DEFAULT_SETTINGS;
    }
    return {
        logoUrl: settings.logoUrl || DEFAULT_SETTINGS.logoUrl,
        heroText: settings.heroText || DEFAULT_SETTINGS.heroText,
    };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
    await dbConnect();
    // Update the first document, or create if it doesn't exist
    await SettingsModel.findOneAndUpdate({}, settings, { upsert: true, new: true });
}

export async function updateSettings(updates: Partial<SiteSettings>): Promise<void> {
    await dbConnect();
    // Update the first document, or create if it doesn't exist
    await SettingsModel.findOneAndUpdate({}, { $set: updates }, { upsert: true, new: true });
}
