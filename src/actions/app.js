import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'

export const GET_INVESTORS = 'GET_INVESTORS'

export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)

export const getInvestors = createAction(GET_INVESTORS, () =>
  api.get(`/investors`)
)
