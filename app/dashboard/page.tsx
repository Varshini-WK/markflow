import { fetchBookmarks } from "@/lib/api";
import { DashboardClient } from "@/components/dashboard-client";

export default async function DashboardPage() {
    const bookmarks = await fetchBookmarks();
    return <DashboardClient initialBookmarks={bookmarks} />;
}
