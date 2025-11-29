import { NextResponse } from 'next/server';
import { getPages, createPage } from '@/lib/storage';

export async function GET() {
    const pages = await getPages();
    return NextResponse.json(pages);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newPage = {
        id: crypto.randomUUID(),
        slug: body.slug,
        title: body.title,
        content: body.content || '',
        order: body.order || 0,
    };
    await createPage(newPage);
    return NextResponse.json(newPage);
}
