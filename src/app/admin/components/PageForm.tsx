"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PageData {
    id?: string;
    title: string;
    slug: string;
    content: string;
    order: number;
}

export default function PageForm({ initialData }: { initialData?: PageData }) {
    const router = useRouter();
    const [formData, setFormData] = useState<PageData>(initialData || {
        title: "",
        slug: "",
        content: "",
        order: 0
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData?.id ? `/api/pages/${initialData.id}` : "/api/pages";
        const method = initialData?.id ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                alert("Error saving page");
            }
        } catch (error) {
            alert("Error saving page");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="page-form">
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => {
                        const title = e.target.value;
                        // Auto-generate slug if it's a new page or slug was auto-generated
                        const slug = title.toLowerCase()
                            .replace(/ğ/g, 'g')
                            .replace(/ü/g, 'u')
                            .replace(/ş/g, 's')
                            .replace(/ı/g, 'i')
                            .replace(/ö/g, 'o')
                            .replace(/ç/g, 'c')
                            .replace(/[^a-z0-9\s-]/g, '')
                            .replace(/\s+/g, '-')
                            .replace(/^-+|-+$/g, '');

                        setFormData(prev => ({
                            ...prev,
                            title,
                            slug: prev.slug && initialData?.id ? prev.slug : slug
                        }));
                    }}
                    required
                />
            </div>
            <div className="form-group">
                <label>Slug</label>
                <input
                    type="text"
                    className="form-control"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Order</label>
                <input
                    type="number"
                    className="form-control"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />
            </div>
            <div className="form-group">
                <label>HTML Content</label>
                <textarea
                    className="form-control editor-textarea"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="<div>Your HTML here</div>"
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save Page"}
            </button>
        </form>
    );
}
