import { handleActions } from 'redux-actions'
import {
  APP_CLOSE_LOADING,
  APP_SHOW_LOADING,
  GET_CONFIGS,
  GET_INVESTOR_TXS,
  GET_INVESTORS,
  GET_POSITION_BY_ID,
  GET_POSITION_HISTORIES,
  GET_VAULTS,
} from 'src/actions/app'
import { mapVault } from 'src/utils/apy'
import { VAULT } from 'src/views/Vault/const'

const initState = {
  loading: false,
  configs: [],
  investors: [],
  investorTxs: [],
  vaults: null,
  positions: {},
}

const app = handleActions(
  {
    [APP_SHOW_LOADING]: (state) => {
      return {
        ...state,
        loading: true,
      }
    },
    [APP_CLOSE_LOADING]: (state) => {
      return {
        ...state,
        loading: false,
      }
    },
    [GET_VAULTS]: (state, { payload }) => {
      const vaults = payload
        .filter((vault) => !!VAULT[vault.name])
        .map((vault) => mapVault(vault))
      return {
        ...state,
        vaults,
      }
    },
    [GET_POSITION_BY_ID]: (state, { payload }) => {
      return {
        ...state,
        positions: { ...state.positions, [payload.id]: payload },
      }
    },
    [GET_POSITION_HISTORIES]: (state, { payload }) => {
      return {
        ...state,
      }
    },
    [GET_INVESTORS]: (state, { payload }) => {
      return {
        ...state,
        investors: payload,
      }
    },
    [GET_INVESTOR_TXS]: (state, { payload }) => {
      return {
        ...state,
        investorTxs: payload,
      }
    },
    [GET_CONFIGS]: (state, { payload }) => {
      return {
        ...state,
        configs: payload,
      }
    },
  },
  initState
)

export default app
