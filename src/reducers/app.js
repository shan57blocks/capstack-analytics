import { handleActions } from 'redux-actions'
import {
  APP_CLOSE_LOADING,
  APP_SHOW_LOADING,
  GET_INVESTORS,
  GET_VAULTS,
} from 'src/actions/app'

const initState = {
  loading: false,
  investors: [],
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
    [GET_INVESTORS]: (state, { payload }) => {
      return {
        ...state,
        investors: payload,
      }
    },
  },
  initState
)

export default app
