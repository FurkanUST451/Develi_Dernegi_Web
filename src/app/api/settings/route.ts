import { NextResponse } from 'next/server';
import { updateSettings } from '@/lib/settings';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { logoUrl } = body;

        if (typeof logoUrl !== 'string') {
            return NextResponse.json({ error: 'Invalid logo URL' }, { status: 400 });
        }

        await updateSettings({ logoUrl });
        revalidatePath('/', 'layout'); // Revalidate everything since settings are global
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
