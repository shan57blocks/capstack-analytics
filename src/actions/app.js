import { createAction } from 'redux-actions'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'

export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)
