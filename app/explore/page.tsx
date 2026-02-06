"use client";

import { useState } from "react";
import { PageShell } from "@/components/layouts/page-shell";
import { cn } from "@/lib/utils";
import {
    Laptop, Lightbulb, Tv, Palette, Smartphone, Bot, Headphones, Wallet, TrendingUp, Book, Briefcase, Plane, Activity, CheckCircle, ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function ExplorePage() {
    const router = useRouter();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleTopic = (id: string) => {
        setSelectedTopics(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const handleContinue = () => {
        if (selectedTopics.length === 0) return;
        setIsLoading(true);
        router.push(`/explore/results?topics=${selectedTopics.join(",")}`);
    };

    return (
        <PageShell
            title="Explore Your Interests"
            description="Select topics you love to unlock top-rated websites tailored to your interests"
            actions={<div />}
        >
            <div className="flex flex-col h-full relative pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TOPICS.map((topic) => {
                        const isSelected = selectedTopics.includes(topic.id);
                        return (
                            <button
                                key={topic.id}
                                onClick={() => toggleTopic(topic.id)}
                                className={cn(
                                    "relative h-32 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all group",
                                    isSelected
                                        ? "bg-[#1E1E1E] border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                        : "bg-[#121212] border-[#2e2e2e] hover:bg-[#1E1E1E]"
                                )}
                            >
                                {isSelected && (
                                    <div className="absolute top-3 right-3 text-blue-500">
                                        <CheckCircle className="w-5 h-5 fill-blue-500 text-[var(--card)]" />
                                    </div>
                                )}
                                <topic.icon className={cn("w-8 h-8", isSelected ? "text-[var(--foreground)]" : "text-gray-400 group-hover:text-[var(--foreground)]")} />
                                <span className={cn("font-medium", isSelected ? "text-[var(--foreground)]" : "text-gray-400 group-hover:text-[var(--foreground)]")}>
                                    {topic.id}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="fixed bottom-10 left-0 right-0 flex justify-center pointer-events-none">
                    <button
                        onClick={handleContinue}
                        disabled={selectedTopics.length === 0 || isLoading}
                        className={cn(
                            "pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-2xl transition-transform",
                            (selectedTopics.length === 0) ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0",
                            isLoading && "opacity-80 cursor-wait"
                        )}
                    >
                        {isLoading ? "Curating..." : "Continue"}
                        {!isLoading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </PageShell>
    );
}
