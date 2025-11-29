import { NextResponse } from 'next/server';
import { updatePage, deletePage } from '@/lib/storage';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    await updatePage(id, body);
    return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await deletePage(id);
    return NextResponse.json({ success: true });
}
