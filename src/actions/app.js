import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'

export const GET_VAULTS = 'GET_VAULTS'
export const GET_INVESTORS = 'GET_INVESTORS'
export const GET_INVESTOR_TXS = 'GET_INVESTOR_TXS'
export const GET_STRATEGY_POSITIONS = 'GET_STRATEGY_POSITIONS'
export const GET_POSITION_BY_ID = 'GET_POSITION_BY_ID'

export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)

export const getVaults = createAction(GET_VAULTS, () => api.get(`/vaults`))

export const getInvestors = createAction(GET_INVESTORS, () =>
  api.get(`/investors`)
)

export const getInvestorTxs = createAction(GET_INVESTOR_TXS, () =>
  api.get(`/investors/transactions`)
)

export const getPositionsByStrategy = createAction(
  GET_STRATEGY_POSITIONS,
  (strategyId) => api.get(`/positions?strategyId=${strategyId}`),
  (strategyId) => ({ strategyId })
)

export const getPositionById = createAction(
  GET_POSITION_BY_ID,
  (positionId) => api.get(`/positions/${positionId}`),
  (positionId, strategyIds) => ({ positionId, strategyIds })
)
