"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layouts/page-shell";
import { CategoryCard } from "@/components/category-card";
import { useBookmarkContext } from "@/context/bookmark-context";
import { cn } from "@/lib/utils";
import {
    Plus, Search, List, Grid2X2,
    Folder, Laptop, Lightbulb, Tv, Palette, Smartphone, Bot, Headphones, Wallet, TrendingUp, Book, Briefcase, DollarSign, Globe, Film, MessageSquare, Brain, Camera, ShoppingBag, Gamepad, Mic, Compass
} from "lucide-react";

// Icon Map helper to convert string back to Component
const ICON_MAP: Record<string, any> = {
    folder: Folder, laptop: Laptop, lightbulb: Lightbulb, tv: Tv, palette: Palette,
    smartphone: Smartphone, bot: Bot, headphones: Headphones, wallet: Wallet,
    trending: TrendingUp, book: Book, briefcase: Briefcase, dollar: DollarSign,
    globe: Globe, film: Film, message: MessageSquare, brain: Brain, camera: Camera,
    shopping: ShoppingBag, gamepad: Gamepad, mic: Mic, compass: Compass
};

export default function CategoriesPage() {
    const { categories, bookmarks } = useBookmarkContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative h-full">
            <PageShell
                title="Categories"
                description="Organize your bookmarks by category"
                actions={
                    <div className="flex items-center gap-3">
                        {/* Search Categories */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#0f0f0f] border border-[#2e2e2e] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 w-48"
                            />
                        </div>

                        {/* List Toggle */}
                        <button
                            onClick={() => setViewMode(prev => prev === "grid" ? "list" : "grid")}
                            className="flex items-center gap-2 bg-[#1E1E1E] text-gray-300 border border-[#2e2e2e] px-3 py-2 rounded-lg text-sm hover:text-white transition"
                        >
                            {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid2X2 className="w-4 h-4" />}
                            {viewMode === "grid" ? "List" : "Grid"}
                        </button>

                        {/* Add New Button (Top) */}
                        <Link href="/categories/add">
                            <button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Add new
                                <Plus className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                }
            >
                <div className={cn(
                    "gap-6 pb-20",
                    viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "flex flex-col space-y-4"
                )}>
                    {filteredCategories.map((cat) => {
                        const IconComponent = ICON_MAP[cat.icon] || Folder;

                        // Dynamic Count Calculation
                        // Match category name or ID (case insensitive)
                        const count = bookmarks.filter(b => {
                            if (cat.id === 'all') return true; // Fix: All category counts everything
                            const bCat = b.category?.toLowerCase() || "";
                            return bCat === cat.name.toLowerCase() || bCat === cat.id.toLowerCase();
                        }).length;

                        return (
                            <div key={cat.id} className={viewMode === "list" ? "w-full" : ""}>
                                <Link href={`/categories/${cat.id}`}>
                                    <CategoryCard
                                        name={cat.name}
                                        icon={IconComponent}
                                        count={count}
                                        color={cat.color}
                                    />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </PageShell>

            {/* Floating Action Button (Bottom Right) */}
            <Link href="/categories/add">
                <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform hover:scale-105 active:scale-95">
                    <Plus className="w-8 h-8 text-white" />
                </button>
            </Link>
        </div>
    );
}
