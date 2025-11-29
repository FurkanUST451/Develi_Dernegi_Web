"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPageList({ initialPages }: { initialPages: any[] }) {
    const [pages, setPages] = useState(initialPages);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this page?")) return;

        const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
        if (res.ok) {
            setPages(pages.filter(p => p.id !== id));
            router.refresh();
        } else {
            alert("Failed to delete");
        }
    };

    return (
        <div className="table-responsive">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((page) => (
                        <tr key={page.id}>
                            <td>{page.title}</td>
                            <td>/{page.slug}</td>
                            <td>
                                <Link href={`/admin/edit/${page.id}`} className="btn btn-sm">Edit</Link>
                                <button onClick={() => handleDelete(page.id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
