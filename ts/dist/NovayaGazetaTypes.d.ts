export interface Article {
    author?: string;
    category?: string;
    content?: string;
    publishedDate?: string;
    slug?: string;
    tags?: any[];
    title?: string;
}
export interface ArticleListMatch {
    eu?: boolean;
    slug: any[];
}
export interface Theme {
    description?: string;
    id?: string;
    name?: string;
    slug?: string;
}
export interface ThemeListMatch {
    description?: string;
    id?: string;
    name?: string;
    slug?: string;
}
