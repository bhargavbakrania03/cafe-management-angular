import { createAction, props } from "@ngrx/store";
import { UserResponse } from "../../../../core/models/response.model";

export const GET_USERS = '[User] GET USERS';
export const SET_USERS = '[User] SET USERS';
export const UPDATE_USER = '[User] UPDATE USER';

export const GetUsers = createAction(GET_USERS)
export const SetUsers = createAction(SET_USERS, props<{users: UserResponse[]}>())
export const UpdateUser = createAction(UPDATE_USER, props<{id: number}>())