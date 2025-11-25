export interface Short {
    id: number;
    tags: string[];
    video_file: string;
    thumbnail: string | null;
    title: string;
    description: string;
    views: number;
    created_at: string;
    updated_at: string;
    user: number;
}