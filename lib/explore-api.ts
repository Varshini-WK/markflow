import { Bookmark } from "@/lib/types";


const TOPIC_MAP: Record<string, string> = {
    "Development": "laptops",      
    "Design": "furniture",         
    "Inspiration": "home-decoration",
    "Entertainment": "vehicle",    
    "Social Media": "smartphones",
    "Ai Tools": "laptops",         
    "Music": "motorcycle",         
    "Finance": "mens-watches",     
    "Fitness": "mens-shoes",       
    "Business": "womens-bags",     
    "Travel": "sunglasses",
    "Books": "laptops"
};

export async function fetchExploreResults(topics: string[]): Promise<Bookmark[]> {
    let allResults: any[] = [];


    await new Promise(resolve => setTimeout(resolve, 800));

    
    for (const topic of topics) {
        const query = TOPIC_MAP[topic] || "laptops";
        try {
            const res = await fetch(`https://dummyjson.com/products/category/${query}?limit=4`);
            const data = await res.json();

            
            const mapped = (data.products || []).map((p: any) => ({
                id: p.id, 
                title: p.title,
                description: p.description,
                category: topic,
                rating: p.rating,
                url: `https://dummyjson.com/products/${p.id}`, 
                icon: p.thumbnail,
                visitCount: 0
            }));

            allResults = [...allResults, ...mapped];
        } catch (e) {
            console.error(`Failed to fetch for ${topic}`, e);
        }
    }

    
    return allResults.sort(() => Math.random() - 0.5);
}
