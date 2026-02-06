import { Bookmark } from "./types";

const DUMMY_API = "https://dummyjson.com/products";

export async function fetchBookmarks(): Promise<Bookmark[]> {
    try {
        const res = await fetch(`${DUMMY_API}?limit=8`);
        const data = await res.json();

        return data.products.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            category: p.category,
            rating: p.rating,
            icon: p.thumbnail, 
            url: "https://example.com",
        }));
    } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
        return [];
    }
}

export async function addBookmark(bookmark: Omit<Bookmark, "id">) {
    const res = await fetch(`${DUMMY_API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: bookmark.title,
            description: bookmark.description,
            category: bookmark.category,
            rating: bookmark.rating,
        }),
    });
    return res.json();
}
