export interface Bookmark {
    id: number;
    title: string;
    description: string;
    category: string;
    rating: number; 
    url?: string;
    icon?: string; 
    visitCount?: number;
    isLiked?: boolean;
}

export interface Category {
    name: string;
    slug: string;
    count?: number;
}
