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

const initState = {
  loading: false,
  configs: [],
  investors: [],
  investorTxs: [],
  vaults: null,
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
      return {
        ...state,
        vaults: payload,
      }
    },
    [GET_POSITION_BY_ID]: (state, { payload }) => {
      return {
        ...state,
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
