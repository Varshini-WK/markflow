"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layouts/page-shell";
import { useBookmarkContext } from "@/context/bookmark-context";
import { BookmarkCard } from "@/components/bookmark-card";
import { ArrowLeft, Search, List, Grid2X2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CategoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { categories, bookmarks } = useBookmarkContext();

    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const category = categories.find(c => c.id === resolvedParams.id);
    const categoryBookmarks = bookmarks.filter(b => {
        if (!category) return false;
        const catName = category.name.toLowerCase();
        const catId = category.id.toLowerCase();
        const bookmarkCat = b.category?.toLowerCase() || "";

        const matchesCategory = bookmarkCat === catName || bookmarkCat === catId ||
            (catId === 'all');

        const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (!category) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <h2 className="text-xl font-bold">Category not found</h2>
                <Link href="/categories" className="text-blue-500 hover:underline mt-2">Go back</Link>
            </div>
        );
    }

    return (
        <PageShell
            title=""
            description=""
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/categories" className="p-2 hover:bg-[#2d2d2d] rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                    <h1 className="text-3xl font-bold text-white max-w-xl truncate">{category.name}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search bookmarks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#0f0f0f] border border-[#2e2e2e] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
                        />
                    </div>

                    <button
                        onClick={() => setViewMode(prev => prev === "grid" ? "list" : "grid")}
                        className="flex items-center gap-2 bg-[#1E1E1E] text-gray-300 border border-[#2e2e2e] px-3 py-2 rounded-lg text-sm hover:text-white transition"
                    >
                        {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid2X2 className="w-4 h-4" />}
                        {viewMode === "grid" ? "List" : "Grid"}
                    </button>
                </div>
            </div>

            <div className={cn(
                "pb-20",
                viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col space-y-4"
            )}>
                {categoryBookmarks.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        No bookmarks found in this category.
                    </div>
                ) : (
                    categoryBookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark.id}
                            bookmark={bookmark}
                            viewMode={viewMode}
                        />
                    ))
                )}
            </div>

        </PageShell>
    );
}
