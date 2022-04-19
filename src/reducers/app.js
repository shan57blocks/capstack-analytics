import { handleActions } from 'redux-actions'
import {
  APP_CLOSE_LOADING,
  APP_SHOW_LOADING,
  GET_INVESTORS,
  GET_VAULTS,
} from 'src/actions/app'

const initState = {
  loading: false,
  investors: [],
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
    [GET_INVESTORS]: (state, { payload }) => {
      return {
        ...state,
        investors: payload,
      }
    },
  },
  initState
)

export default app
