import { handleActions } from 'redux-actions'

import { APP_SHOW_LOADING, APP_CLOSE_LOADING } from 'src/actions/app'

const initState = {
  loading: false,
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
  },
  initState
)

export default app
