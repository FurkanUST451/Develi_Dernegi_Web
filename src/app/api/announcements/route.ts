import { NextResponse } from 'next/server';
import { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from '@/lib/announcements';

export async function GET() {
    const items = await getAnnouncements();
    return NextResponse.json(items);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Simple validation
        if (!body.title || !body.text) {
            return NextResponse.json({ error: 'Title and Text are required' }, { status: 400 });
        }
        await addAnnouncement(body);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await updateAnnouncement(id, updates);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await deleteAnnouncement(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
