import { NextResponse } from 'next/server';
import { getMembers, addMember, updateMember, deleteMember } from '@/lib/members';
import { revalidatePath } from 'next/cache';

export async function GET() {
    const items = await getMembers();
    return NextResponse.json(items);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Simple validation
        if (!body.name || !body.job) {
            return NextResponse.json({ error: 'Name and Job are required' }, { status: 400 });
        }
        await addMember(body);
        revalidatePath('/uyelerimiz');
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

        await updateMember(id, updates);
        revalidatePath('/uyelerimiz');
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

        await deleteMember(id);
        revalidatePath('/uyelerimiz');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
