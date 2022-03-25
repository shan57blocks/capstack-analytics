import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GET_VAULTS = 'GET_VAULTS'

export const getVaults = createAction(GET_VAULTS, () => api.get(`/vaults`))
