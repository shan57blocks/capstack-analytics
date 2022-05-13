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
import vaults from './vaults.json'
import configs from './configs.json'
import transactions from './transactions.json'

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
      payload = vaults

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
      payload = [
        {
          id: 1,
          name: '57blocks',
          wallet: '0x7c43375fc06ded6169db079a3f5f9b75fa0cec1d',
          chain: 'Ethereum',
        },
      ]
      return {
        ...state,
        investors: payload,
      }
    },
    [GET_INVESTOR_TXS]: (state, { payload }) => {
      payload = transactions
      return {
        ...state,
        investorTxs: payload,
      }
    },
    [GET_CONFIGS]: (state, { payload }) => {
      payload = configs
      return {
        ...state,
        configs: payload,
      }
    },
  },
  initState
)

export default app
