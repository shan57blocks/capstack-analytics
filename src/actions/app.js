import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'

export const GET_PROTOCOLS = 'GET_PROTOCOLS'
export const GET_POOLS = 'GET_POOLS'
export const GET_CURRENT_POSITIONS = 'GET_CURRENT_POSITIONS'
export const GET_POSITIONS = 'GET_POSITIONS'

export const SELECT_ACCOUNT = 'SELECT_ACCOUNT'

export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)

export const getProtocols = createAction(GET_PROTOCOLS, () =>
  api.get(`/defi/protocols`)
)

export const getPools = createAction(GET_POOLS, () => api.get(`/defi/pools`))

export const getPositions = createAction(GET_POSITIONS, (account) =>
  api.get(`/defi/positions?wallet=${account}`)
)

export const getCurrentPositions = createAction(
  GET_CURRENT_POSITIONS,
  (account) => api.get(`/defi/current-positions?wallet=${account}`)
)

export const selectAccount = createAction(
  SELECT_ACCOUNT,
  (accountId) => accountId
)
