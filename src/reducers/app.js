import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  SELECT_ACCOUNT,
  GET_PROTOCOL_POSITIONS,
  GET_CURRENT_POSITIONS,
} from 'src/actions/app'
import { mapPosition } from 'src/utils/apy'

const initState = {
  loading: false,
  accounts: [
    { id: 1, address: '0xc0aad83d27b5b091729efe16a7b068f6bdab1f1c' },
    { id: 2, address: '0x7c43375fc06ded6169db079a3f5f9b75fa0cec1d' },
  ],
  selectedAccount: '0xc0aad83d27b5b091729efe16a7b068f6bdab1f1c',
  protocolPositions: null,
  protocolClosedPositions: null,
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
      const protocolPositions = []
      const protocolClosedPositions = []

      payload.forEach((protocolPosition) => {
        const positions = protocolPosition.positions
          .filter((position) => !position.closed)
          .map((position) => mapPosition(position))
        const closedPositions = protocolPosition.positions
          .filter((position) => position.closed)
          .map((position) => mapPosition(position))

        if (positions.length) {
          protocolPositions.push({
            protocol: protocolPosition.protocol,
            positions,
          })
        }
        if (closedPositions.length) {
          protocolClosedPositions.push({
            protocol: protocolPosition.protocol,
            positions: closedPositions,
          })
        }
      })

      return {
        ...state,
        protocolPositions: protocolPositions,
        protocolClosedPositions: protocolClosedPositions,
      }
    },
    [GET_CURRENT_POSITIONS]: (state, { payload }) => {
      return {
        ...state,
        currentPositions: payload,
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
