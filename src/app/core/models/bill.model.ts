export interface BillData {
    name: string;
    email: string;
    contactNumber: string;
    paymentMethod: string;
    total: number;
    productDetails: string;
}

export interface PdfData {
    name: string;
    uuid: string;
    email: string;
    contactNumber: string;
    paymentMethod: string;
    total: number;
    productDetails: string;
}

export interface ProductDetails {
    name: string;
    total: number;
    price: number;
    id: number;
    quantity: string;
    caategory: string;
}