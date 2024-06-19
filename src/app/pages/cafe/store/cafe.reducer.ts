import { createFeature, createReducer, on } from "@ngrx/store";

import { BillResponse, CategoryResponse, DashboardResponse, UserResponse } from "../../../core/models/response.model";
import { Product } from "../../../core/models/product.model";
import * as DashboardActions from './actions/dashboard.actions';
import * as CategoryActions from './actions/category.actions';
import * as ProductActions from './actions/product.actions';
import * as CafeActions from "./actions/cafe.actions";
import * as BillActions from "./actions/bill.actions";
import * as UserActions from './actions/user.actions'

export interface CafeState {
    dashboardData: DashboardResponse;
    category: CategoryResponse[];
    products: Product[];
    productsByCategory: Product[];
    productsById: Product;
    billResponse: Blob | null;
    bills: BillResponse[];
    pdf: Blob | null;
    users: UserResponse[];
    error: string;
}

const initialState: CafeState = {
    dashboardData: {
        productCount: 0,
        categoryCount: 0,
        billCount: 0
    },
    category: [],
    products: [],
    productsByCategory: [],
    productsById: {},
    billResponse: null,
    bills: [],
    pdf: null,
    users: [],
    error: '',
}

const CafeReducer = createReducer(initialState,
    on(DashboardActions.SetDashboardData, (state, action) => (
        {
            ...state,
            dashboardData: action.data
        }
    )),
    on(CategoryActions.SetCategory, (state, action) => ({
        ...state,
        category: action.category
    })),
    on(CategoryActions.AddCategory, (state, action) => {
        let allow = true;
        state.category.forEach(item => {
            if (item.category === action.category) {
                allow = false;
            }
        })

        if (allow) {
            return {
                ...state,
                category: [...state.category, { id: null, category: action.category }]
            }
        }
        else {
            return state
        }
    }),
    on(CategoryActions.AddCategoryId, (state, action) => {
        let updatedCategoryArray = [
            ...state.category
        ];

        updatedCategoryArray = updatedCategoryArray.map((item => {
            if (item.category === action.category.category) {
                return { ...item, id: action.category.id, category: action.category.category }
            }
            else {
                return item;
            }
        }))

        console.log(updatedCategoryArray)

        return {
            ...state,
            category: updatedCategoryArray
        }
    }),
    on(CategoryActions.UpdateCategory, (state, action) => {
        let updatedCategoryArray = [
            ...state.category
        ]

        updatedCategoryArray = updatedCategoryArray.map((item => {
            if (item.id === action.category.id) {
                return { ...item, id: action.category.id, category: action.category.category }
            }
            else {
                return item;
            }
        }))

        console.log(updatedCategoryArray)

        return {
            ...state,
            category: updatedCategoryArray
        }
    }),
    on(ProductActions.SetProducts, (state, action) => ({
        ...state,
        products: action.products
    })),
    on(ProductActions.AddProduct, (state, action) => {
        // let allow = true;
        // state.products.forEach(item => {
        //     if (item.name === action.product.name) {
        //         allow = false;
        //     }
        // })

        // if (allow) {
        let categoryName!: string;

        state.category.forEach(item => {
            if (item.id === action.product.categoryId) {
                categoryName = item.category;
            }
        })
        return {
            ...state,
            products: [...state.products, { ...action.product, id: null, categoryName }],
        }
        // }
        // else {
        //     return state
        // }
    }),
    on(ProductActions.AddProductId, (state, action) => {
        let updatedProductsArray = [
            ...state.products
        ];

        updatedProductsArray = updatedProductsArray.map((item => {
            if (item.name === action.product.name) {
                return { ...item, id: action.product.id }
            }
            else {
                return item;
            }
        }))

        console.log(updatedProductsArray)

        return {
            ...state,
            products: updatedProductsArray
        }
    }),
    on(ProductActions.UpdateProduct, (state, action) => {
        let updatedProductsArray = state.products.map((item => {
            if (item.id === action.product.id) {
                let newItem: Product = { ...item, id: action.product.id, name: action.product.name, description: action.product.description, categoryId: action.product.categoryId, price: action.product.price }

                if (item.categoryId !== action.product.categoryId) {
                    state.category.forEach(category => {
                        if (category.id === action.product.categoryId) {
                            newItem = { ...item, categoryName: category.category }
                        }
                    })
                }
                console.log(newItem)
                return newItem;
            }
            else {
                return item;
            }
        }))

        return {
            ...state,
            products: updatedProductsArray
        }
    }),
    on(ProductActions.ChangeProductStatus, (state, action) => {
        let updatedProductsArray = state.products.map((item => {
            let newStatus = item.status;
            if (item.id === action.id) {
                let newItem: Product = { ...item, status: !newStatus }
                console.log(newItem)
                return newItem;
            }
            else {
                return item;
            }
        }))

        return {
            ...state,
            products: updatedProductsArray
        }
    }),
    on(ProductActions.DeleteProduct, (state, action) => {
        let updatedProductsArray = state.products.filter((item) => {
            return item.id !== action.id
        })

        return {
            ...state,
            products: updatedProductsArray,
        }
    }),
    on(ProductActions.GetProductByCategory, (state, action) => {
        let products: Product[] = [];
        // console.log(state.products)
        state.products.forEach((item => {
            if (item.categoryName === action.category) {
                item.status && products.push(item);
            }
        }))
        products = [...products]
        console.log(products)
        return {
            ...state,
            productsByCategory: products,
        }
    }),
    on(ProductActions.GetProductById, (state, action) => {
        let product: Product = {};
        // console.log(state.products)
        state.products.forEach((item => {
            if (item.id === action.id) {
                product = item;
            }
        }))
        console.log(product)
        return {
            ...state,
            productsById: product,
        }
    }),
    on(BillActions.StoreBlob, (state, action) => {
        console.log(action.blob)
        return {
            ...state,
            billResponse: action.blob,
        }
    }),
    on(BillActions.ClearBlob, (state, action) => {
        console.log('cleared Blob')
        return {
            ...state,
            billResponse: null,
        }
    }),
    on(BillActions.SetBillData, (state, action) => {
        return {
            ...state,
            bills: action.bills,
        }
    }),
    on(BillActions.StorePDF, (state, action) => {
        return {
            ...state,
            pdf: action.pdf,
        }
    }),
    on(BillActions.ClearPDF, (state, _action) => {
        console.log('cleared PDF')
        return {
            ...state,
            pdf: null,
        }
    }),
    on(BillActions.DeleteBill, (state, action) => {
        const newBills = state.bills.filter(bill => bill.id !== action.id);
        return {
            ...state,
            bills: newBills,
        }
    }),
    on(UserActions.SetUsers, (state, action) => {
        return {
            ...state,
            users: action.users,
        }
    }),
    on(UserActions.UpdateUser, (state, action) => {
        let curStatus!: boolean;
        state.users.forEach(user => {
            if (user.id === action.id) {
                curStatus = user.status;
                user = { ...user, status: !curStatus }
                return;
            }
        })
        return state;
    }),
    on(CafeActions.ActionFailure, (state, action) => ({
        ...state,
        error: action.error,
    })),
    on(CafeActions.ClearFailureMessage, (state, _action) => ({
        ...state,
        error: '',
    })),
)

export const CafeFeature = createFeature({
    name: 'cafe',
    reducer: CafeReducer
})