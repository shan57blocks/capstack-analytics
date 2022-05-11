import { handleActions } from 'redux-actions'
import {
  APP_CLOSE_LOADING,
  APP_SHOW_LOADING,
  GET_CONFIGS,
  GET_INVESTOR_TXS,
  GET_INVESTORS,
  GET_POSITION_BY_ID,
  GET_STRATEGY_POSITIONS,
  GET_VAULTS,
  GET_POSITION_HISTORIES,
} from 'src/actions/app'
import { mapPosition, mapStrategy } from 'src/utils/apy'
import { deepClone } from 'src/utils/common'
import { VAULT_STATUS } from 'src/views/Vault/const'

const initState = {
  loading: false,
  configs: [],
  investors: [],
  investorTxs: [],
  vaults: null,
  positionStrategies: {},
  strategyPositions: {},
  strategies: {},
  status: null,
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
      const positionStrategies = {}
      const strategies = {}

      payload.forEach((vault) => {
        vault.strategies.forEach((strategy) => {
          strategy.positions.forEach((position) => {
            if (!position.closed) {
              vault.status = VAULT_STATUS.OPEN
            }
          })
        })
      })

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
      strategies[strategyId] = mapStrategy(
        strategy,
        positions,
        state.positionStrategies
      )
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
        strategies[id] = mapStrategy(
          strategy,
          positions,
          state.positionStrategies
        )
      })
      return {
        ...state,
        strategyPositions,
        strategies,
      }
    },
    [GET_POSITION_HISTORIES]: (state, { payload, meta }) => {
      const strategies = deepClone(state.strategies)
      const strategyPositions = deepClone(state.strategyPositions)
      meta.strategyIds.forEach((id) => {
        const strategy = strategies[id]
        const positions = [mapPosition(payload)]
        strategyPositions[id] = positions
        strategies[id] = mapStrategy(
          strategy,
          positions,
          state.positionStrategies
        )
      })
      return {
        ...state,
        strategyPositions,
        strategies,
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
