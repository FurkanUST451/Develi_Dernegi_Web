import { getPageBySlug, getPages } from "@/lib/storage";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const page = await getPageBySlug(decodedSlug);

    if (!page) {
        notFound();
    }

    return (
        <div className="page-content" style={{ width: '100%', maxWidth: '100%', paddingTop: '100px' }}>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
    );
}
