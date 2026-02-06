import { Star, ExternalLink, Share2, Trash2, Edit2, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Bookmark } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useBookmarkContext } from "@/context/bookmark-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BookmarkCardProps {
    bookmark: Bookmark;
    viewMode?: "grid" | "list";
}

export function BookmarkCard({ bookmark, viewMode = "grid" }: BookmarkCardProps) {
    const { incrementVisitCount, deleteBookmark } = useBookmarkContext();
    const router = useRouter();

    const handleVisit = () => {
        incrementVisitCount(bookmark.id);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${bookmark.title}"?`)) {
            deleteBookmark(bookmark.id);
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/addbookmark?edit=${bookmark.id}`);
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(bookmark.url || "");
            alert("URL copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    if (viewMode === "list") {
        return (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center justify-between hover:border-[var(--foreground)] transition-all group">
                <div className="flex items-center gap-4 flex-1">

                    <div className="w-12 h-12 bg-black rounded-lg p-1.5 flex items-center justify-center shrink-0">
                        <img src={bookmark.icon} alt={bookmark.title} className="w-full h-full object-cover rounded-md" />
                    </div>


                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] truncate">{bookmark.title}</h3>

                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={cn("w-3 h-3", i < Math.round(bookmark.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-700")} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)] mt-0.5 truncate max-w-md">{bookmark.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 ml-4">
                    <span className="bg-[var(--background)] text-[var(--muted-foreground)] text-xs px-2 py-1 rounded-md font-medium">
                        {bookmark.category}
                    </span>

                    <a href={bookmark.url || "#"} target="_blank" rel="noopener noreferrer" onClick={handleVisit}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                            Visit website
                            <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                    </a>

                    <div className="flex gap-2">
                        <button
                            onClick={handleEdit}
                            className="p-2 bg-[var(--background)] text-[var(--muted-foreground)] rounded-lg hover:bg-[var(--foreground)] hover:text-[var(--background)] transition" title="Edit">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2 bg-[var(--background)] text-[var(--muted-foreground)] rounded-lg hover:bg-[var(--foreground)] hover:text-[var(--background)] transition" title="Share">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 bg-[var(--background)] text-[var(--muted-foreground)] rounded-lg hover:bg-red-500 hover:text-white transition" title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group relative bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 transition-all hover:border-[var(--foreground)] hover:shadow-lg h-full flex flex-col">

            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-3 min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] truncate w-full" title={bookmark.title}>
                        {bookmark.title}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2">
                        {bookmark.description}
                    </p>
                </div>
                <div className="w-10 h-10 bg-black rounded-lg p-1 flex items-center justify-center shrink-0">
                    <img
                        src={bookmark.icon}
                        alt={bookmark.title}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                "w-3.5 h-3.5",
                                i < Math.round(bookmark.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                            )}
                        />
                    ))}
                </div>

                <span className="bg-[var(--background)] text-[var(--muted-foreground)] text-[10px] px-2 py-1 rounded-full uppercase tracking-wider">
                    {bookmark.category}
                </span>
            </div>
            <a href={bookmark.url || "#"} target="_blank" rel="noopener noreferrer" onClick={handleVisit} className="absolute inset-0 z-0" />

            <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
                <a href={bookmark.url || "#"} target="_blank" rel="noopener noreferrer" onClick={handleVisit}>
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" title="Visit Website">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </a>
                <button
                    onClick={handleEdit}
                    className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition" title="Edit">
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={handleShare}
                    className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition" title="Share URL">
                    <Share2 className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                    className="p-2 bg-white text-black rounded-lg hover:bg-red-200 hover:text-red-600 transition" title="Delete">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
