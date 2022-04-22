import { handleActions } from 'redux-actions'
import {
  APP_CLOSE_LOADING,
  APP_SHOW_LOADING,
  GET_INVESTORS,
  GET_INVESTOR_TXS,
  GET_POSITION_BY_ID,
  GET_STRATEGY_POSITIONS,
  GET_VAULTS,
} from 'src/actions/app'
import { mapPosition, mapStrategy } from 'src/utils/apy'
import { BN, deepClone } from 'src/utils/common'

const initState = {
  loading: false,
  investors: [],
  investorTxs: [],
  vaults: null,
  positionStrategies: {},
  strategyPositions: {},
  strategies: {},
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
          const token = strategy.positions[0].tokens.find(
            (token) => token.id === strategy.tokenId
          )
          const decimals = `1e${token.decimals}`
          const decimalsBN = BN(decimals)
          strategy.principals = BN(strategy.principals)
            .div(decimalsBN)
            .toString()
          strategy.unallocated = BN(strategy.unallocated)
            .div(decimalsBN)
            .toString()
          strategy.profit = BN(strategy.profit).div(decimalsBN).toString()
          strategy.managementFee = BN(strategy.managementFee)
            .div(decimalsBN)
            .toString()
          strategy.performanceFee = BN(strategy.performanceFee)
            .div(decimalsBN)
            .toString()
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
  },
  initState
)

export default app
