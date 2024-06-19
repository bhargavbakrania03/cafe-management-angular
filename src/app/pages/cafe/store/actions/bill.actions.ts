import { createAction, props } from "@ngrx/store";
import { BillData, PdfData } from "../../../../core/models/bill.model";
import { BillResponse } from "../../../../core/models/response.model";

export const GENERATE_BILL = '[Bill] GENERATE BILL';
export const GET_BILL_DATA = '[Bill] GET BILL DATA';
export const GET_PDF = '[Bill] GET PDF';
export const STORE_PDF = '[Bill] STORE PDF';
export const SET_BILL_DATA = '[Bill] SET BILL DATA';
export const STORE_BLOB = '[Bill] STORE BLOB';
export const CLEAR_BLOB = '[Bill] CLEAR BLOB';
export const CLEAR_PDF = '[Bill] CLEAR PDF';
export const DELETE_BILL = '[Bill] DELETE BILL';

export const GenerateBill = createAction(GENERATE_BILL, props<{ billData: BillData }>())
export const StoreBlob = createAction(STORE_BLOB, props<{ blob: Blob }>())
export const ClearBlob = createAction(CLEAR_BLOB)
export const ClearPDF = createAction(CLEAR_PDF)
export const GetBillData = createAction(GET_BILL_DATA)
export const GetPDF = createAction(GET_PDF, props<{ data: PdfData }>())
export const StorePDF = createAction(STORE_PDF, props<{ pdf: Blob }>())
export const SetBillData = createAction(SET_BILL_DATA, props<{ bills: BillResponse[] }>())
export const DeleteBill = createAction(DELETE_BILL, props<{id: number}>())