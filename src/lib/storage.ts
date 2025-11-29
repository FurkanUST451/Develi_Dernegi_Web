import mongoose from 'mongoose';
import dbConnect from './db';

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  order: number;
}

// Mongoose Schema
const PageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
}, { timestamps: true });

// Check if model already exists
const PageModel = mongoose.models.Page || mongoose.model('Page', PageSchema);

export async function getPages(): Promise<Page[]> {
  await dbConnect();
  const pages = await PageModel.find({}).sort({ order: 1 });
  return pages.map(doc => ({
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    content: doc.content,
    order: doc.order,
  }));
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  await dbConnect();
  const doc = await PageModel.findOne({ slug });
  if (!doc) return undefined;
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    content: doc.content,
    order: doc.order,
  };
}

export async function createPage(page: Page): Promise<void> {
  await dbConnect();
  await PageModel.create(page);
}

export async function updatePage(id: string, updates: Partial<Page>): Promise<void> {
  await dbConnect();
  await PageModel.findOneAndUpdate({ id }, updates);
}

export async function deletePage(id: string): Promise<void> {
  await dbConnect();
  await PageModel.findOneAndDelete({ id });
}
