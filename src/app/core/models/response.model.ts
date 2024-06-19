import { ProductDetails } from "./bill.model";

export interface DashboardResponse {
    categoryCount: number;
    productCount: number;
    billCount: number;
}

export interface CategoryResponse {
    id: number | null;
    category: string;
}

export interface BillResponse {
    id: number;
    uuid: string;
    name: string;
    email: string;
    contactNumber: string;
    paymentMethod: string;
    total: number;
    productDetails: ProductDetails[];
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    contactNumber: string;
    status: boolean;
}