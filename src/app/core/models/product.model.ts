export interface Product {
    id?: number | null;
    name?: string;
    categoryId?: number;
    categoryName?: string;
    price?: number;
    description?: string;
    status?: boolean;
}