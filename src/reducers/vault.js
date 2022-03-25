import { handleActions } from 'redux-actions'
import {
  GET_POSITION_BY_ID,
  GET_STRATEGY_POSITIONS,
  GET_VAULTS,
} from 'src/actions/vault'
import { deepClone } from 'src/utils/common'

const initState = {
  vaults: null,
  positionStrategies: {},
  strategyPositions: {},
}

const app = handleActions(
  {
    [GET_VAULTS]: (state, { payload }) => {
      const positionStrategies = {}
      payload.forEach((vault) => {
        vault.strategies.forEach((strategy) => {
          strategy.positions.forEach((position) => {
            if (!positionStrategies[position.id]) {
              positionStrategies[position.id] = []
            }
            positionStrategies[position.id].push(strategy)
          })
        })
      })
      Object.values(positionStrategies).forEach((strategies) => {
        if (strategies.length > 1) {
          strategies.forEach((strategy) => {
            strategy.sharedPosition = true
          })
        }
      })

      return {
        ...state,
        vaults: payload,
        positionStrategies,
      }
    },
    [GET_STRATEGY_POSITIONS]: (state, { payload, meta }) => {
      const strategyPositions = deepClone(state.strategyPositions)
      strategyPositions[meta.strategyId] = payload
      return {
        ...state,
        strategyPositions,
      }
    },
    [GET_POSITION_BY_ID]: (state, { payload, meta }) => {
      const strategyPositions = deepClone(state.strategyPositions)
      meta.strategyIds.forEach((id) => {
        strategyPositions[id] = [payload]
      })
      return {
        ...state,
        strategyPositions,
      }
    },
  },
  initState
)

export default app
