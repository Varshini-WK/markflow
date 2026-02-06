"use client";

import { useState } from "react";
import { useBookmarkContext } from "@/context/bookmark-context";
import { PageShell } from "@/components/layouts/page-shell";
import { BookmarkCard } from "@/components/bookmark-card";
import { List, ArrowUpDown, Grid2X2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FrequentPage() {
    const { bookmarks, searchQuery } = useBookmarkContext();
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [sortBy, setSortBy] = useState<"count" | "date">("count");

    let displayedBookmarks = bookmarks.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    displayedBookmarks.sort((a, b) => {
        if (sortBy === "count") {
            const countA = a.visitCount || 0;
            const countB = b.visitCount || 0;
            if (countA !== countB) return countB - countA;
            return b.id - a.id;
        } else {
            return b.id - a.id;
        }
    });

    return (
        <PageShell
            title="Frequent"
            description="Your most visited bookmarks, always at hand."
            actions={
                <div className="flex gap-3">
                    <button
                        onClick={() => setSortBy(prev => prev === "count" ? "date" : "count")}
                        className="flex items-center gap-2 bg-[#1E1E1E] border border-[#2e2e2e] text-gray-300 px-4 py-2 rounded-lg text-sm hover:text-white transition"
                    >
                        <ArrowUpDown className="w-4 h-4" />
                        {sortBy === "count" ? "Most Frequent" : "Newest"}
                    </button>
                    <button
                        onClick={() => setViewMode(prev => prev === "grid" ? "list" : "grid")}
                        className="flex items-center gap-2 bg-[#1E1E1E] text-gray-300 border border-[#2e2e2e] px-3 py-2 rounded-lg text-sm hover:text-white transition"
                    >
                        {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid2X2 className="w-4 h-4" />}
                        {viewMode === "grid" ? "List" : "Grid"}
                    </button>
                </div>
            }
        >
            <div className={cn(
                "pb-20 gap-4",
                viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "flex flex-col"
            )}>
                {displayedBookmarks.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 col-span-full">
                        {searchQuery ? <p>No bookmarks match your search.</p> : (
                            <>
                                <p>No visited bookmarks yet.</p>
                                <p className="text-sm mt-2">Start visiting your bookmarks to see them here!</p>
                            </>
                        )}
                    </div>
                ) : (
                    displayedBookmarks.map((bookmark) => (
                        <div key={bookmark.id} className={viewMode === "list" ? "w-full" : ""}>
                            <BookmarkCard
                                bookmark={bookmark}
                                viewMode={viewMode}
                            />
                        </div>
                    ))
                )}
            </div>
        </PageShell>
    );
}
