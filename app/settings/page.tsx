"use client";

import { useState, useRef } from "react";
import { PageShell } from "@/components/layouts/page-shell";
import { useBookmarkContext } from "@/context/bookmark-context";
import { cn } from "@/lib/utils";
import { Upload, Download, Trash2, Moon, Globe, ChevronDown, Check, Star } from "lucide-react";

export default function SettingsPage() {
    const {
        bookmarks,
        setBookmarks,
        clearBookmarks,
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
    } = useBookmarkContext();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = () => {
        const dataStr = JSON.stringify(bookmarks, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `markflow-backup-${new Date().toISOString().slice(0, 10)}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };


    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            try {
                const parsed = JSON.parse(content);
                if (Array.isArray(parsed)) {
                    setBookmarks([...bookmarks, ...parsed]);
                    alert(`Successfully imported ${parsed.length} bookmarks!`);
                } else {
                    alert("Invalid file format: Root must be an array.");
                }
            } catch (err) {
                console.error(err);
                alert("Failed to parse JSON file.");
            }
        };
        reader.readAsText(fileObj);
        event.target.value = '';
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to delete ALL your bookmarks? This cannot be undone.")) {
            clearBookmarks();
        }
    };

    return (
        <PageShell
            title="Settings"
            description="Manage your app preferences and data."
            actions={<div />}
        >
            <div className="max-w-3xl space-y-8 pb-20">
                <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">General Settings</h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <label className="text-[var(--foreground)]">Default category</label>
                            <div className="relative">
                                <select
                                    value={defaultCategory}
                                    onChange={(e) => setDefaultCategory(e.target.value)}
                                    className="appearance-none bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] px-4 py-2 pr-10 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
                                >
                                    <option value="Uncategorized">Uncategorized</option>
                                    <option value="Development">Development</option>
                                    <option value="Design">Design</option>
                                    <option value="Education">Education</option>
                                    <option value="all">All</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-[var(--foreground)]">Auto-fetch website data</label>
                            <button
                                onClick={() => setAutoFetch(!autoFetch)}
                                className={cn(
                                    "w-12 h-6 rounded-full relative transition-colors",
                                    autoFetch ? "bg-blue-600" : "bg-gray-600"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                                    autoFetch ? "left-7" : "left-1"
                                )} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-[var(--foreground)]">Default rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setDefaultRating(star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={cn(
                                                "w-5 h-5",
                                                star <= defaultRating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Appearance</h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Moon className="w-5 h-5 text-gray-400" />
                                <span className="text-[var(--foreground)]">Dark Mode</span>
                            </div>
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className={cn(
                                    "w-12 h-6 rounded-full relative transition-colors",
                                    theme === "dark" ? "bg-blue-600" : "bg-gray-600"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                                    theme === "dark" ? "left-7" : "left-1"
                                )} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-gray-400" />
                                <span className="text-[var(--foreground)]">Language</span>
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] px-4 py-2 pr-10 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="English">English</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Bookmark Management</h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[var(--foreground)]">Export bookmarks</span>
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                Export data
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-[var(--foreground)]">Import bookmarks</span>
                            <div className="flex items-center gap-4">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".json"
                                    onChange={handleFileChange}
                                />
                                <div className="bg-[var(--background)] border border-[var(--border)] px-4 py-2 rounded-lg text-gray-400 text-sm">
                                    Choose file...
                                </div>
                                <button
                                    onClick={handleImportClick}
                                    className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Import
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-[#2e2e2e] my-4" />

                        <div className="flex items-center justify-between">
                            <span className="text-[var(--foreground)]">Clear all bookmarks</span>
                            <button
                                onClick={handleClearAll}
                                className="flex items-center gap-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-[var(--foreground)] border border-red-600/20 px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear all
                            </button>
                        </div>
                    </div>
                </section>

                <div className="text-center text-xs text-gray-500 pt-8">
                    © 2025 Markflow. Version 1.0.0
                </div>
            </div>
        </PageShell>
    );
}
