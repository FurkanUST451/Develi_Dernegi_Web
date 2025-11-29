import { NextResponse } from 'next/server';
import { getHeroSlides, addHeroSlide, deleteHeroSlide } from '@/lib/hero';
import { revalidatePath } from 'next/cache';

export async function GET() {
    const slides = await getHeroSlides();
    return NextResponse.json(slides);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { imageUrl } = body;

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
        }

        await addHeroSlide(imageUrl);
        revalidatePath('/');
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

        await deleteHeroSlide(id);
        revalidatePath('/');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
