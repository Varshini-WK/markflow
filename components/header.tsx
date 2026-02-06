"use client";

import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { useBookmarkContext } from "@/context/bookmark-context";

export function Header() {
    const { searchQuery, setSearchQuery } = useBookmarkContext();

    return (
        <header className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)] bg-[var(--background)] transition-colors duration-300">
           
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                    type="text"
                    placeholder="Search anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

           
            <Link href="/addbookmark">
                <button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" />
                    New Bookmark
                </button>
            </Link>
        </header>
    );
}
