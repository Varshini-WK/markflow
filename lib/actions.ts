"use server";

export async function fetchUrlMetadata(url: string) {
    try {
        if (!url.startsWith("http")) {
            url = `https://${url}`;
        }

        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const html = await res.text();

        
        const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
        const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
            html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
const iconMatch = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']*)["']/i);
        return {
            title: titleMatch ? titleMatch[1] : "",
            description: descMatch ? descMatch[1] : "",
            icon: iconMatch ? iconMatch[1] : "",
        };
    } catch (error) {
        console.error("Metadata fetch error:", error);
        return { title: "", description: "" };
    }
}
