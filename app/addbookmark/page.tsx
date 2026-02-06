"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageShell } from "@/components/layouts/page-shell";
import { useBookmarkContext } from "@/context/bookmark-context";
import { Star, Link as LinkIcon, Search, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchUrlMetadata } from "@/lib/actions";

function AddBookmarkContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const { addBookmark, updateBookmark, categories, bookmarks, autoFetch, defaultRating } = useBookmarkContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        url: "",
        title: "",
        description: "",
        category: "",
        rating: defaultRating,
        icon: "",
    });
    const [isFetching, setIsFetching] = useState(false);
    const [isSaving, setIsSaving] = useState(false);


    useEffect(() => {
        if (editId) {
            const existing = bookmarks.find(b => b.id === Number(editId));
            if (existing) {
                setFormData({
                    url: existing.url || "",
                    title: existing.title || "",
                    description: existing.description || "",
                    category: existing.category || "",
                    rating: existing.rating || defaultRating,
                    icon: existing.icon || "",
                });
            }
        }
    }, [editId, bookmarks]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFetch = async () => {
        if (!formData.url) return;
        setIsFetching(true);
        try {
            const metadata = await fetchUrlMetadata(formData.url);
            setFormData(prev => ({
                ...prev,
                title: metadata.title || prev.title,
                description: metadata.description || prev.description,
                icon: metadata.icon || prev.icon
            }));
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            handleChange("icon", imageUrl);
        }
    };

    const handleSave = () => {
        if (!formData.title) {
            alert("Please enter a title");
            return;
        }

        if (isSaving) return;
        setIsSaving(true);


        if (editId) {
            updateBookmark({
                id: Number(editId),
                ...formData,
                visitCount: bookmarks.find(b => b.id === Number(editId))?.visitCount || 0,
                isLiked: bookmarks.find(b => b.id === Number(editId))?.isLiked || false,
                icon: formData.icon || "https://via.placeholder.com/150",
            });
        } else {
            addBookmark({
                id: Date.now(),
                ...formData,
                visitCount: 0,
                isLiked: false,
                icon: formData.icon || "https://via.placeholder.com/150",
            });
        }

        router.push("/dashboard");
    };

    return (
        <PageShell
            title={editId ? "Edit Bookmark" : "Add New Bookmark"}
            description={editId ? "Update your bookmark details" : "Save a new bookmark to your collection"}
        >
            <div className="max-w-2xl space-y-6">

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">URL *</label>
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="http://example.com"
                                className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 pl-10 text-[var(--foreground)] focus:border-blue-500 focus:outline-none"
                                value={formData.url}
                                onChange={(e) => handleChange("url", e.target.value)}
                            />
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                        <button
                            onClick={handleFetch}
                            disabled={isFetching || !autoFetch}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                        >
                            <Search className="w-4 h-4" />
                            {isFetching ? "Fetching..." : "Fetch Website Data"}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Figma"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:border-blue-500 focus:outline-none"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </div>


                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        placeholder="e.g. Cloud-based UI/UX design tool."
                        rows={2}
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:border-blue-500 focus:outline-none resize-none"
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Logo</label>
                        <div
                            className="w-20 h-20 bg-[var(--card)] border border-[var(--border)] rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 overflow-hidden relative group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {formData.icon ? (
                                <img src={formData.icon} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-1 text-gray-500">
                                    <Upload className="w-5 h-5" />
                                    <span className="text-[10px]">Upload</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Upload className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Bookmark Rating</label>
                        <div className="flex items-center gap-1 h-20">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleChange("rating", star)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={cn(
                                            "w-6 h-6",
                                            star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Category</label>
                    <select
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:border-blue-500 focus:outline-none appearance-none"
                        value={formData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? "Saving..." : (editId ? "Update Bookmark" : "Save Bookmark")}
                </button>

            </div>
        </PageShell>
    );
}

export default function AddBookmarkPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddBookmarkContent />
        </Suspense>
    )
}
