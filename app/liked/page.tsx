"use client";

import { PageShell } from "@/components/layouts/page-shell";
import { useBookmarkContext } from "@/context/bookmark-context";
import { BookmarkCard } from "@/components/bookmark-card";
import { Bookmark } from "@/lib/types";
import { Heart, ArrowLeft, ExternalLink, CheckCircle, Save } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LikedPage() {
    const { likedItems, bookmarks, addBookmark, toggleLike } = useBookmarkContext();

    const handleSave = (bookmark: Bookmark) => {

        const isAlreadySaved = bookmarks.some(b => b.title === bookmark.title);
        if (isAlreadySaved) return;

        addBookmark({
            ...bookmark,
            id: Date.now() + Math.random(),
        });
    };

    return (
        <PageShell
            title="Liked Items"
            description="Your curated list of favorites from the Explore page."
            actions={
                <Link
                    href="/explore"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Explore
                </Link>
            }
        >
            {likedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                    <div className="bg-[#1E1E1E] p-4 rounded-full mb-4">
                        <Heart className="w-8 h-8 text-gray-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">No liked items yet</h2>
                    <p className="text-gray-400 max-w-sm mb-6">
                        Explore new tools and resources and like them to see them here.
                    </p>
                    <Link
                        href="/explore"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Go to Explore
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {likedItems.map((item) => {
                        const isSaved = bookmarks.some(b => b.title === item.title);

                        const isLiked = true;

                        return (
                            <div key={item.id} className="group relative bg-[#1E1E1E] border border-[#2e2e2e] rounded-xl p-5 hover:border-gray-600 transition-all flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-white text-lg line-clamp-1">{item.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1 line-clamp-2 h-8">{item.description}</p>
                                    </div>
                                    <img src={item.icon} alt={item.title} className="w-10 h-10 rounded-md object-cover bg-black" />
                                </div>

                        
                                <div className="flex gap-1 mb-6">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className={cn("w-2 h-2 rounded-full", i < Math.round(item.rating) ? "bg-yellow-400" : "bg-gray-700")} />
                                    ))}
                                </div>

                            
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#2e2e2e]">
        
                                    <button
                                        onClick={() => !isSaved && handleSave(item)}
                                        className={cn(
                                            "flex items-center gap-2 text-sm font-medium transition-colors",
                                            isSaved ? "text-blue-500" : "text-gray-300 hover:text-white"
                                        )}
                                    >
                                        {isSaved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                        {isSaved ? "Saved" : "Save"}
                                    </button>

                
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => toggleLike(item)}
                                            className="flex items-center gap-1 transition-colors text-red-500"
                                        >
                                            <Heart className="w-4 h-4 fill-current" />
                                            <span className="text-xs">Liked</span>
                                        </button>
                                        <a href={item.url} target="_blank" className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                            <span className="text-xs">Visit</span>
                                        </a>
                                    </div>
                                </div>

                                
                                <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-0 transition-opacity text-[10px] bg-black/50 px-2 py-1 rounded">
                                    {item.category}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </PageShell>
    );
}
