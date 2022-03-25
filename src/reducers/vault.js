import { handleActions } from 'redux-actions'
import { GET_VAULTS } from 'src/actions/vault'

const initState = {
  vaults: null,
}

const app = handleActions(
  {
    [GET_VAULTS]: (state, { payload }) => {
      return {
        ...state,
        vaults: payload,
      }
    },
  },
  initState
)

export default app
