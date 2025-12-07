import { NextResponse } from 'next/server';
import { addSupporter, deleteSupporter, getSupporters } from '@/lib/supporters';

export async function GET() {
    try {
        const supporters = await getSupporters();
        return NextResponse.json(supporters);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch supporters' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body.imageUrl) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
        }
        await addSupporter({
            imageUrl: body.imageUrl,
            name: body.name,
            link: body.link
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add supporter' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await deleteSupporter(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete supporter' }, { status: 500 });
    }
}
