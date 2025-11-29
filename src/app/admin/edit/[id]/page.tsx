import { getPages } from "@/lib/storage";
import PageForm from "../../components/PageForm";
import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pages = await getPages();
    const page = pages.find(p => p.id === id);

    if (!page) {
        notFound();
    }

    return (
        <div>
            <h2>Edit Page: {page.title}</h2>
            <PageForm initialData={page} />
        </div>
    );
}
