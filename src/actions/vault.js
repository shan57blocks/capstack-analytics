import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GET_VAULTS = 'GET_VAULTS'
export const GET_STRATEGY_POSITIONS = 'GET_STRATEGY_POSITIONS'
export const GET_POSITION_BY_ID = 'GET_POSITION_BY_ID'

export const getVaults = createAction(GET_VAULTS, () => api.get(`/vaults`))

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
