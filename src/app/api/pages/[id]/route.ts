import { NextResponse } from 'next/server';
import { updatePage, deletePage } from '@/lib/storage';
import { revalidatePath } from 'next/cache';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    await updatePage(id, body);
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await deletePage(id);
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
}
