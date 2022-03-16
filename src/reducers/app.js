import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  SELECT_ACCOUNT,
  GET_PROTOCOL_POSITIONS,
  GET_POSITION_HISTORY,
} from 'src/actions/app'

const initState = {
  loading: false,
  accounts: [
    { id: 1, address: '0xc0aad83d27b5b091729efe16a7b068f6bdab1f1c' },
    { id: 2, address: '0x7c43375fc06ded6169db079a3f5f9b75fa0cec1d' },
  ],
  selectedAccount: '0xc0aad83d27b5b091729efe16a7b068f6bdab1f1c',
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
      return {
        ...state,
        protocolPositions: fillBorrows(payload),
      }
    },
    [GET_POSITION_HISTORY]: (state, { payload }) => {
      return {
        ...state,
        histories: payload,
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

const fillBorrows = (protocolPositions) => {
  const result = protocolPositions.map((protocolPosition) => {
    protocolPosition.positions = protocolPosition.positions.map((position) => {
      position.histories = position.histories.map((history) => {
        if (!history.borrows) {
          history.borrows = genBorrows(history.assets.length)
        }
        return history
      })
      return position
    })
    return protocolPosition
  })
  console.log(result)
  return result
}

const genBorrows = (length) => {
  const result = []
  for (let i = 0; i < length; i++) {
    result.push({ balance: 0 })
  }
  return result
}
