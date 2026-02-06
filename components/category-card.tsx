import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
    name: string;
    icon: LucideIcon;
    count: number;
    color?: string; 
}

export function CategoryCard({ name, icon: Icon, count, color }: CategoryCardProps) {

    return (
        <div className={cn(
            "group bg-[#1E1E1E] border border-[#2e2e2e] rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer h-32 flex flex-col justify-between relative overflow-hidden",
            "hover:border-opacity-50"
        )}>
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity", color)} />

            <div className="flex items-start justify-between relative z-10">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">
                    {name}
                </h3>
                <div className={cn("p-2 rounded-lg bg-[#2d2d2d] group-hover:bg-white/10 transition-colors")}>
                    <Icon className="w-5 h-5 text-gray-300" />
                </div>
            </div>
            <div className="relative z-10">
                <span className="bg-[#2d2d2d] text-gray-400 text-xs px-2.5 py-1.5 rounded-md group-hover:bg-white/20 group-hover:text-white transition-colors">
                    {count} bookmarks
                </span>
            </div>
        </div>
    );
}
