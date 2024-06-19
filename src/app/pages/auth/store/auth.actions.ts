import { createAction, props } from "@ngrx/store"
import { ChangePassword, ForgotPassword, Login, ResetPassword, SignUp } from "../../../core/models/auth.model"

export const LOGIN_START = '[Auth] LOGIN START'
export const SIGNUP_START = '[Auth] SIGNUP START'

export const LOGIN_SUCCESS = '[Auth] LOGIN SUCCESS'

export const ACTION_SUCCESS = '[Auth] ACTION SUCCESS'
export const ACTION_FAILURE = '[Auth] ACTION FAILURE'

export const LOGOUT = '[Auth] LOGOUT'

export const CHANGE_PASSWORD_START = '[Auth] CHANGE PASSWORD START'

export const FORGOT_PASSWORD_START = '[Auth] FORGOT PASSWORD START'

export const RESET_PASSWORD_START = '[Auth] RESET PASSWORD START'

export const CHECK_RESET_TOKEN_START = '[Auth] CHECK RESET TOKEN START'
export const CHECK_RESET_TOKEN_RESULT = '[Auth] CHECK RESET TOKEN RESULT'

export const CLEAR_SUCCESS_MESSAGE = '[Auth] CLEAR SUCCESS MESSAGE'
export const CLEAR_FAILURE_MESSAGE = '[Auth] CLEAR FAILURE MESSAGE'


export const LoginStart = createAction(LOGIN_START, props<{ loginData: Login }>())
export const SignupStart = createAction(SIGNUP_START, props<{ signupData: SignUp }>())

export const LoginSuccess = createAction(LOGIN_SUCCESS, props<{ token: string, message: string }>())

export const Logout = createAction(LOGOUT)

export const ChangePasswordStart = createAction(CHANGE_PASSWORD_START, props<{ changePasswordData: ChangePassword }>())

export const ForgotPasswordStart = createAction(FORGOT_PASSWORD_START, props<{ forgotPasswordData: ForgotPassword }>())

export const ResetPasswordStart = createAction(RESET_PASSWORD_START, props<{ resetPasswordData: ResetPassword, resetToken: string }>())

export const CheckResetTokenStart = createAction(CHECK_RESET_TOKEN_START, props<{ token: string }>())
export const CheckResetTokenResult = createAction(CHECK_RESET_TOKEN_RESULT, props<{ message: boolean }>())

export const ActionSuccess = createAction(ACTION_SUCCESS, props<{ message: string }>())

export const ActionFailure = createAction(ACTION_FAILURE, props<{ error: string }>())

export const ClearSuccessMessage = createAction(CLEAR_SUCCESS_MESSAGE)
export const ClearFailureMessage = createAction(CLEAR_FAILURE_MESSAGE)