"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Bookmark } from "@/lib/types";

type Category = {
    id: string;
    name: string;
    icon: string;
    color: string;
    count: number;
};

interface BookmarkContextType {
    bookmarks: Bookmark[];
    setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
    categories: Category[];
    addCategory: (category: Category) => void;
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    sortBy: "date" | "title" | "rating";
    setSortBy: (sort: "date" | "title" | "rating") => void;


    addBookmark: (bookmark: Bookmark) => void;
    updateBookmark: (bookmark: Bookmark) => void;
    deleteBookmark: (id: number) => void;
    incrementVisitCount: (id: number) => void;

    likedItems: Bookmark[];
    toggleLike: (item: Bookmark) => void;


    defaultCategory: string;
    setDefaultCategory: (cat: string) => void;
    autoFetch: boolean;
    setAutoFetch: (enabled: boolean) => void;
    defaultRating: number;
    setDefaultRating: (rating: number) => void;
    theme: "dark" | "light";
    setTheme: (theme: "dark" | "light") => void;
    language: string;
    setLanguage: (lang: string) => void;
    clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const INITIAL_CATEGORIES: Category[] = [
    { id: "all", name: "All", icon: "folder", color: "bg-gray-800", count: 124 },
    { id: "dev", name: "Development", icon: "laptop", color: "bg-blue-900", count: 8 },
    { id: "inspiration", name: "Inspiration", icon: "lightbulb", color: "bg-yellow-900", count: 17 },
];

export function BookmarkProvider({ children, initialBookmarks = [] }: { children: React.ReactNode, initialBookmarks?: Bookmark[] }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"date" | "title" | "rating">("date");
    const [isLoading, setIsLoading] = useState(false);

    const [likedItems, setLikedItems] = useState<Bookmark[]>([]);

    const [defaultCategory, setDefaultCategory] = useState("all");
    const [autoFetch, setAutoFetch] = useState(true);
    const [defaultRating, setDefaultRating] = useState(3);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [language, setLanguage] = useState("English");

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            root.style.colorScheme = "dark";
        } else {
            root.classList.remove("dark");
            root.style.colorScheme = "light";
        }
    }, [theme]);

    const addBookmark = (bookmark: Bookmark) => {
        setBookmarks((prev) => [bookmark, ...prev]);
    };

    const addCategory = (category: Category) => {
        setCategories((prev) => [...prev, category]);
    };

    const updateBookmark = (updated: Bookmark) => {
        setBookmarks((prev) => prev.map(b => b.id === updated.id ? updated : b));
    };

    const deleteBookmark = (id: number) => {
        setBookmarks((prev) => prev.filter(b => b.id !== id));
    };

    const clearBookmarks = () => {
        setBookmarks([]);
    };

    const incrementVisitCount = (id: number) => {
        setBookmarks((prev) => prev.map(b =>
            b.id === id ? { ...b, visitCount: (b.visitCount || 0) + 1 } : b
        ));
    };

    const toggleLike = (item: Bookmark) => {
        setLikedItems((prev) => {
            const exists = prev.some(i => i.id === item.id);
            if (exists) {
                return prev.filter(i => i.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    return (
        <BookmarkContext.Provider
            value={{
                bookmarks,
                setBookmarks,
                isLoading,
                searchQuery,
                setSearchQuery,
                viewMode,
                setViewMode,
                sortBy,
                setSortBy,
                addBookmark,
                updateBookmark,
                deleteBookmark,
                clearBookmarks,
                categories,
                addCategory,
                incrementVisitCount,
                likedItems,
                toggleLike,
                defaultCategory,
                setDefaultCategory,
                autoFetch,
                setAutoFetch,
                defaultRating,
                setDefaultRating,
                theme,
                setTheme,
                language,
                setLanguage
            }}
        >
            {children}
        </BookmarkContext.Provider>
    );
}

export function useBookmarkContext() {
    const context = useContext(BookmarkContext);
    if (context === undefined) {
        throw new Error("useBookmarkContext must be used within a BookmarkProvider");
    }
    return context;
}
