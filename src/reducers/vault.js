import { handleActions } from 'redux-actions'
import {
  GET_POSITION_BY_ID,
  GET_STRATEGY_POSITIONS,
  GET_VAULTS,
} from 'src/actions/vault'
import { mapPosition, mapStrategy } from 'src/utils/apy'
import { deepClone } from 'src/utils/common'

const initState = {
  vaults: null,
  positionStrategies: {},
  strategyPositions: {},
  strategies: {},
}

const app = handleActions(
  {
    [GET_VAULTS]: (state, { payload }) => {
      const positionStrategies = {}
      const strategies = {}
      payload.forEach((vault) => {
        vault.strategies.forEach((strategy) => {
          strategies[strategy.id] = strategy
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
        strategies,
      }
    },
    [GET_STRATEGY_POSITIONS]: (state, { payload, meta }) => {
      const { strategyId } = meta
      const strategies = deepClone(state.strategies)
      const strategyPositions = deepClone(state.strategyPositions)
      const strategy = strategies[strategyId]

      const positions = payload.map((position) => mapPosition(position))
      strategyPositions[strategyId] = positions
      strategies[strategyId] = mapStrategy(strategy, positions)
      return {
        ...state,
        strategyPositions,
        strategies,
      }
    },
    [GET_POSITION_BY_ID]: (state, { payload, meta }) => {
      const strategies = deepClone(state.strategies)
      const strategyPositions = deepClone(state.strategyPositions)
      meta.strategyIds.forEach((id) => {
        const strategy = strategies[id]
        const positions = [mapPosition(payload)]
        strategyPositions[id] = positions
        strategies[id] = mapStrategy(strategy, positions)
      })
      return {
        ...state,
        strategyPositions,
        strategies,
      }
    },
  },
  initState
)

export default app
