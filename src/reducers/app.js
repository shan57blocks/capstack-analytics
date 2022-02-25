import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  SELECT_ACCOUNT,
  GET_POSITIONS,
  GET_PROTOCOLS,
  GET_POOLS,
} from 'src/actions/app'

const initState = {
  loading: false,
  accounts: [
    { id: 1, address: '0xc0aad83d27b5b091729efe16a7b068f6bdab1f1c' },
    { id: 2, address: '0x7c43375fc06ded6169db079a3f5f9b75fa0cec1d' },
  ],
  selectedAccount: '0xc0aad83d27b5b091729efe16a7b068f6bdab1f1c',
  protocols: null,
  pools: null,
  positions: null,
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
    [GET_PROTOCOLS]: (state, { payload }) => {
      return {
        ...state,
        protocols: payload,
      }
    },
    [GET_POOLS]: (state, { payload }) => {
      return {
        ...state,
        pools: payload,
      }
    },
    [GET_POSITIONS]: (state, { payload }) => {
      return {
        ...state,
        positions: payload,
      }
    },
    [SELECT_ACCOUNT]: (state, { payload }) => {
      const account = state.accounts.find((account) => account.id === payload)
      return {
        ...state,
        selectedAccount: account.address,
      }
    },
  },
  initState
)

export default app
