import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT'
export const GET_POSITIONS = 'GET_POSITIONS'

export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)

export const selectAccount = createAction(
  SELECT_ACCOUNT,
  (accountId) => accountId
)

export const getPositions = createAction(GET_POSITIONS, (account) =>
  api.get(`/defi/positions?wallet=${account}`)
)
