"use client";

import { useEffect } from "react";
import { useBookmarkContext } from "@/context/bookmark-context";
import { BookmarkCard } from "@/components/bookmark-card";
import { Bookmark } from "@/lib/types";
import { ArrowUpDown, List, Grid2X2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardClient({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
    const {
        bookmarks,
        setBookmarks,
        searchQuery,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy
    } = useBookmarkContext();

    useEffect(() => {
        if (initialBookmarks.length > 0) {
            setBookmarks((prev) => {
                const existingIds = new Set(prev.map(b => b.id));
                const newBookmarks = initialBookmarks.filter(b => !existingIds.has(b.id));
                if (newBookmarks.length > 0) {
                    return [...prev, ...newBookmarks];
                }
                return prev;
            });
        }
    }, [initialBookmarks, setBookmarks]);

    const filteredBookmarks = bookmarks.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-[var(--foreground)]">Home</h2>
                    <p className="text-[var(--muted-foreground)] mt-1">Effortless Bookmark Management</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSortBy(sortBy === "title" ? "rating" : "title")}
                        className="flex items-center gap-2 bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] px-3 py-2 rounded-lg text-sm hover:text-[var(--foreground)] transition active:scale-95"
                    >
                        <ArrowUpDown className="w-4 h-4" />
                        {sortBy === "title" ? "Name" : "Smart Sort"}
                    </button>
                    <button
                        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                        className="flex items-center gap-2 bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] px-3 py-2 rounded-lg text-sm hover:text-[var(--foreground)] transition active:scale-95"
                    >
                        {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid2X2 className="w-4 h-4" />}
                        {viewMode === "grid" ? "List" : "Grid"}
                    </button>
                </div>
            </div>

            <div className={cn(
                "grid gap-6",
                viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                    : "grid-cols-1"
            )}>
                {filteredBookmarks.map((bookmark) => (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
                {filteredBookmarks.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-500">
                        No bookmarks found for "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
}
