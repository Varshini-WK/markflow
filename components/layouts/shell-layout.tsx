"use client";

import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ShellLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isLoading } = useAuth();

    const isPublicPage = pathname === "/";

    useEffect(() => {
        if (!isLoading) {
            if (!user && !isPublicPage) {
                router.push("/");
            } else if (user && isPublicPage) {
                router.push("/dashboard");
            }
        }
    }, [user, isLoading, pathname, isPublicPage, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
            </div>
        );
    }

    if (isPublicPage) {
        return (
            <main className="h-screen w-full overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
                {children}
            </main>
        );
    }
    if (!user) return null;

    return (
        <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 w-full"> {/* Aligned padding with Header */}
                    {children}
                </main>
            </div>
        </div>
    );
}
