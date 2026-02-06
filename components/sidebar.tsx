import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Folder, Clock, Compass, PlusCircle, Settings, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", icon: Home, href: "/dashboard" }, // Updated href since we moved dashboard
    { name: "Categories", icon: Folder, href: "/categories" },
    { name: "Frequent", icon: Clock, href: "/frequent" },
    { name: "Explore", icon: Compass, href: "/explore" },
    { name: "Liked", icon: Heart, href: "/liked" },
    { name: "Add Bookmark", icon: PlusCircle, href: "/addbookmark" },
    { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-[var(--sidebar)] border-r border-[var(--border)] flex flex-col font-sans transition-colors duration-300">
           
            <div className="p-6">
                <Link href="/dashboard" className="block">
                    <Image
                        src="/logo.png"
                        alt="Markflow"
                        width={180}
                        height={60}
                        className="h-16 w-auto object-contain"
                        priority
                    />
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.href !== "/dashboard");

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all",
                                isActive
                                    ? "bg-[var(--card)] text-[var(--foreground)] font-bold shadow-sm"
                                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]/50"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-blue-500" : "")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

           
            <div className="p-6 text-xs text-[var(--muted-foreground)]">
                &copy; 2025 Markflow. <br /> Zakaria Zyami
            </div>
        </div>
    );
}
