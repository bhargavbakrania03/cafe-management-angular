import { createAction, props } from "@ngrx/store";

export const ACTION_FAILURE = '[Cafe] ACTION FAILURE';
export const CLEAR_FAILURE_MESSAGE = '[Cafe] CLEAR FAILURE MESSAGE';

export const ActionFailure = createAction(ACTION_FAILURE, props<{ error: string }>())
export const ClearFailureMessage = createAction(CLEAR_FAILURE_MESSAGE)