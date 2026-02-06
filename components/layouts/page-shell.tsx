import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
}

export function PageShell({ title, description, actions, children, className }: PageShellProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white">{title}</h2>
                    {description && <p className="text-gray-400 mt-1">{description}</p>}
                </div>

                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}
            </div>
            <div className={cn("mt-6", className)}>
                {children}
            </div>
        </div>
    );
}
