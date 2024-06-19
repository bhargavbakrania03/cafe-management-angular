import { createFeature, createReducer, on } from "@ngrx/store"

import * as AuthActions from "./auth.actions"

export interface AuthState {
    isAuthenticated: boolean,
    authToken: string | null,
    allowResetPassword: boolean | null,
    errorMessage: string,
    message: string,
}

const initialState: AuthState = {
    isAuthenticated: false,
    authToken: null,
    allowResetPassword: null,
    errorMessage: '',
    message: ''
}

const AuthReducer = createReducer(initialState,
    on(AuthActions.LoginSuccess, (state, action) => ({
        ...state,
        isAuthenticated: true,
        message: action.message,
        errorMessage: '',
        authToken: action.token
    })),
    on(AuthActions.Logout, (state, action) => {
        console.log('Logout')
        return {
            ...state,
            isAuthenticated: false,
            authToken: null,
        }
    }),
    on(AuthActions.CheckResetTokenResult, (state, action) => ({
        ...state,
        allowResetPassword: action.message
    })),
    on(AuthActions.ActionSuccess, (state, action) => {
        return {
            ...state,
            message: action.message
        }
    }),
    on(AuthActions.ActionFailure, (state, action) => ({
        ...state,
        errorMessage: action.error,
    })),
    on(AuthActions.ClearSuccessMessage, (state, action) => ({
        ...state,
        message: ''
    })),
    on(AuthActions.ClearFailureMessage, (state, action) => ({
        ...state,
        errorMessage: '',
    })),
)

export const AuthFeature = createFeature({
    name: 'auth',
    reducer: AuthReducer
})