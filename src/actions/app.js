import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'

export const GET_PROTOCOLS = 'GET_PROTOCOLS'
export const GET_POOLS = 'GET_POOLS'
export const GET_POSITION_HISTORY = 'GET_POSITION_HISTORY'
export const GET_PROTOCOL_POSITIONS = 'GET_POSITIONS'
export const GET_PROTOCOL_POSITIONS_V2 = 'GET_POSITIONS_V2'

export const SELECT_ACCOUNT = 'SELECT_ACCOUNT'

export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)

export const getProtocolPositions = createAction(
  GET_PROTOCOL_POSITIONS,
  (account) => api.get(`/strategy/positions?account=${account}`)
)

export const getProtocolPositionsV2 = createAction(
  GET_PROTOCOL_POSITIONS_V2,
  (protocol) => api.get(`/strategy/positions/protocol/${protocol}`)
)

export const getPositionHistory = createAction(GET_POSITION_HISTORY, (id) =>
  api.get(`/strategy/positions/${id}/histories`)
)

export const selectAccount = createAction(
  SELECT_ACCOUNT,
  (accountId) => accountId
)
