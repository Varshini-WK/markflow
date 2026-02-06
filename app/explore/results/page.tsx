"use client";

import { useState, useEffect, Suspense } from "react";
import { PageShell } from "@/components/layouts/page-shell";
import { useBookmarkContext } from "@/context/bookmark-context";
import { fetchExploreResults } from "@/lib/explore-api";
import { Bookmark } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
    Laptop, Lightbulb, Tv, Palette, Smartphone, Bot, Headphones, Wallet, TrendingUp, Book, Briefcase, Plane, Activity, CheckCircle, Save, Heart, ExternalLink, ArrowLeft
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const TOPICS = [
    { id: "Development", icon: Laptop },
    { id: "Inspiration", icon: Lightbulb },
    { id: "Entertainment", icon: Tv },
    { id: "Design", icon: Palette },
    { id: "Social Media", icon: Smartphone },
    { id: "Ai Tools", icon: Bot },
    { id: "Music", icon: Headphones },
    { id: "Finance", icon: Wallet },
    { id: "Fitness", icon: Activity },
    { id: "Travel", icon: Plane },
    { id: "Books", icon: Book },
    { id: "Business", icon: TrendingUp },
];

function ResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { bookmarks, addBookmark, likedItems, toggleLike } = useBookmarkContext();

    const [results, setResults] = useState<Bookmark[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const selectedTopics = searchParams.get("topics")?.split(",").filter(Boolean) || [];

    useEffect(() => {
        const fetchResults = async () => {
            if (selectedTopics.length === 0) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const data = await fetchExploreResults(selectedTopics);
                setResults(data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [searchParams]);

    const handleTopicToggle = (id: string) => {
        const current = new Set(selectedTopics);
        if (current.has(id)) {
            current.delete(id);
        } else {
            current.add(id);
        }

        const newTopics = Array.from(current);

        if (newTopics.length === 0) {
            router.push("/explore/results");
        } else {
            router.push(`/explore/results?topics=${newTopics.join(",")}`);
        }
    };

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
            title="For You"
            description="Discover your next favorite tool."
            actions={
                <Link
                    href="/explore"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
            }
        >
            <div className="flex flex-col gap-6 h-full pb-20">
                <div className="w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex gap-3 w-max">
                        {TOPICS.map((topic) => {
                            const isSelected = selectedTopics.includes(topic.id);
                            return (
                                <button
                                    key={topic.id}
                                    onClick={() => handleTopicToggle(topic.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors whitespace-nowrap",
                                        isSelected
                                            ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                                            : "bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                                    )}
                                >
                                    <topic.icon className="w-4 h-4" />
                                    {topic.id}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p>No topics selected.</p>
                        <p className="text-sm mt-2">Select a topic from the bar above to see results.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {results.map((item) => {
                            const isSaved = bookmarks.some(b => b.title === item.title);
                            const isLiked = likedItems.some(i => i.id === item.id);

                            return (
                                <div key={item.id} className="group relative bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--foreground)] transition-all flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-[var(--foreground)] text-lg line-clamp-1">{item.title}</h3>
                                            <p className="text-[var(--muted-foreground)] text-xs mt-1 line-clamp-2 h-8">{item.description}</p>
                                        </div>
                                        <img src={item.icon} alt={item.title} className="w-10 h-10 rounded-md object-cover bg-black" />
                                    </div>

                                    <div className="flex gap-1 mb-6">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className={cn("w-2 h-2 rounded-full", i < Math.round(item.rating) ? "bg-yellow-400" : "bg-gray-700")} />
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
                                        <button
                                            onClick={() => !isSaved && handleSave(item)}
                                            className={cn(
                                                "flex items-center gap-2 text-sm font-medium transition-colors",
                                                isSaved ? "text-blue-500" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                            )}
                                        >
                                            {isSaved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                            {isSaved ? "Saved" : "Save"}
                                        </button>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => toggleLike(item)}
                                                className={cn(
                                                    "flex items-center gap-1 transition-colors",
                                                    isLiked ? "text-red-500" : "text-[var(--muted-foreground)] hover:text-red-500"
                                                )}
                                            >
                                                <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                                                <span className="text-xs">{isLiked ? "Liked" : "Like"}</span>
                                            </button>
                                            <a href={item.url} target="_blank" className="flex items-center gap-1 text-[var(--muted-foreground)] hover:text-blue-400 transition-colors">
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
            </div>
        </PageShell>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <ResultsContent />
        </Suspense>
    );
}
