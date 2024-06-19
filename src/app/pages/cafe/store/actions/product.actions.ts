import { createAction, props } from "@ngrx/store"
import { Product } from "../../../../core/models/product.model"

export const GET_PRODUCTS = '[Product] GET PRODUCTS'
export const SET_PRODUCTS = '[Product] SET PRODUCTS'
export const ADD_PRODUCT = '[Product] ADD PRODUCT'
export const ADD_PRODUCT_ID = '[Product] ADD PRODUCT ID'
export const UPDATE_PRODUCT = '[Product] UPDATE PRODUCT'
export const CHANGE_PRODUCT_STATUS = '[Product] CHANGE PRODUCT STATUS'
export const DELETE_PRODUCT = '[Product] DELETE PRODUCT'

export const GET_PRODUCT_BY_CATEGORY = '[Manage Order] GET PRODUCT BY CATEGORY'
export const GET_PRODUCT_BY_ID = '[Manage Order] GET PRODUCT BY ID'

export const GetProducts = createAction(GET_PRODUCTS)
export const SetProducts = createAction(SET_PRODUCTS, props<{ products: Product[] }>())
export const AddProduct = createAction(ADD_PRODUCT, props<{ product: Product }>())
export const AddProductId = createAction(ADD_PRODUCT_ID, props<{ product: Product }>())
export const UpdateProduct = createAction(UPDATE_PRODUCT, props<{ product: Product }>())
export const ChangeProductStatus = createAction(CHANGE_PRODUCT_STATUS, props<{ id: number }>())
export const DeleteProduct = createAction(DELETE_PRODUCT, props<{ id: number }>())

export const GetProductByCategory = createAction(GET_PRODUCT_BY_CATEGORY, props<{ category: string }>())
export const GetProductById = createAction(GET_PRODUCT_BY_ID, props<{ id: number }>())