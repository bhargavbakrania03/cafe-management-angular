import { createAction, props } from "@ngrx/store"
import { DashboardResponse } from "../../../../core/models/response.model"

export const GET_DASHBOARD_DATA = '[Dashboard] GET DASHBOARD DATA'
export const SET_DASHBOARD_DATA = '[Dashboard] SET DASHBOARD DATA'

export const GetDashboardData = createAction(GET_DASHBOARD_DATA)
export const SetDashboardData = createAction(SET_DASHBOARD_DATA, props<{ data: DashboardResponse }>())