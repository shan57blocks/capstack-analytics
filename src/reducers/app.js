import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  GET_POSITION_HISTORY,
  GET_PROTOCOL_POSITIONS,
} from 'src/actions/app'
import { deepClone } from 'src/utils/common'

const initState = {
  loading: false,
  protocols: [
    'alpha-finance',
    'alpaca-finance',
    'badger-dao',
    'tokemak',
    'joe',
  ],
  protocolPositions: null,
  histories: null,
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
    [GET_PROTOCOL_POSITIONS]: (state, { payload }) => {
      const newProtocolPositions = state.protocolPositions
        ? deepClone(state.protocolPositions)
        : []
      newProtocolPositions.push(payload)
      return {
        ...state,
        protocolPositions: fillBorrows(newProtocolPositions),
      }
    },
    [GET_POSITION_HISTORY]: (state, { payload }) => {
      return {
        ...state,
        histories: payload,
      }
    },
  },
  initState
)

export default app

const fillBorrows = (protocolPositions) => {
  const result = protocolPositions.map((protocolPosition) => {
    protocolPosition.positions = protocolPosition.positions.map((position) => {
      position.histories = position.histories.map((history) => {
        if (!history.borrows) {
          history.borrows = genBorrows(history.assets.length)
        }
        if (!history.rewards) {
          history.rewards = []
        }
        return history
      })
      return position
    })
    return protocolPosition
  })
  return result
}

const genBorrows = (length) => {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push({ balance: 0 })
  }
  return result
}
