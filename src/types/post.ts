export type Post = {
    _id: string;
    title: string;
    author: string;
    slug: string;
    category: string;
    summary: string;
    content?: string;
    created_at: Date | string;
};