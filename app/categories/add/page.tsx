"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Laptop, Palette, Briefcase, Smartphone, DollarSign, Globe, Music, Film,
    MessageSquare, Book, Brain, Camera, ShoppingBag, Gamepad, Lightbulb, Mic, Compass, Tv
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarkContext } from "@/context/bookmark-context";

const ICONS = [
    { id: "laptop", icon: Laptop }, { id: "palette", icon: Palette }, { id: "briefcase", icon: Briefcase },
    { id: "smartphone", icon: Smartphone }, { id: "dollar", icon: DollarSign }, { id: "globe", icon: Globe },
    { id: "music", icon: Music }, { id: "film", icon: Film }, { id: "message", icon: MessageSquare },
    { id: "book", icon: Book }, { id: "brain", icon: Brain }, { id: "camera", icon: Camera },
    { id: "shopping", icon: ShoppingBag }, { id: "gamepad", icon: Gamepad }, { id: "lightbulb", icon: Lightbulb },
    { id: "mic", icon: Mic }, { id: "compass", icon: Compass }, { id: "tv", icon: Tv },
];

const COLORS = [
    "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-teal-500",
    "bg-blue-500", "bg-purple-500", "bg-gray-500", "bg-indigo-900"
];

export default function AddCategoryPage() {
    const router = useRouter();
    const { addCategory } = useBookmarkContext();
    const [name, setName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("laptop");
    const [selectedColor, setSelectedColor] = useState("bg-blue-500");

    const handleCreate = () => {
        if (!name) return;

        addCategory({
            id: Date.now().toString(),
            name,
            icon: selectedIcon,
            color: selectedColor,
            count: 0
        });

        router.push("/categories");
    };

    return (
        <div className="flex items-center justify-center h-full p-4">
            <div className="w-full max-w-lg bg-[#121212] border border-[#2e2e2e] rounded-2xl p-8 shadow-2xl relative">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white">Add New Category</h2>
                    <p className="text-gray-400 text-sm mt-1">Create a new category to organize your bookmarks</p>
                </div>

                <div className="space-y-6">
                    {/* Category Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Category Name *</label>
                        <input
                            type="text"
                            placeholder="Enter category name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#1E1E1E] border border-[#2e2e2e] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none placeholder-gray-600"
                        />
                    </div>

                    {/* Choose Icon */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Choose Icon</label>
                        <div className="bg-[#1E1E1E] border border-[#2e2e2e] rounded-lg p-3 grid grid-cols-9 gap-2">
                            {ICONS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedIcon(item.id)}
                                    className={cn(
                                        "p-2 rounded-md hover:bg-[#2d2d2d] transition-colors flex items-center justify-center",
                                        selectedIcon === item.id ? "bg-blue-600 text-white" : "text-gray-400"
                                    )}
                                >
                                    <item.icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Choose Color */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Choose color</label>
                        <div className="bg-[#1E1E1E] border border-[#2e2e2e] rounded-lg p-4 flex justify-between items-center">
                            {COLORS.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={cn(
                                        "w-6 h-6 rounded-full transition-transform hover:scale-110 focus:outline-none",
                                        color,
                                        selectedColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#1E1E1E]" : ""
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                        <button
                            onClick={handleCreate}
                            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Create Category
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="w-full bg-transparent text-gray-400 font-medium py-3 rounded-lg hover:text-white border border-[#2e2e2e] hover:border-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
