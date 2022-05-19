import { handleActions } from 'redux-actions'
import {
  APP_CLOSE_LOADING,
  APP_SHOW_LOADING,
  GET_CONFIGS,
  GET_INVESTOR_TXS,
  GET_INVESTORS,
  GET_POSITION_BY_ID,
  GET_POSITION_HISTORIES,
  GET_VAULTS,
} from 'src/actions/app'
import { mapPosition, mapStrategy, mapVault } from 'src/utils/apy'
import { deepClone } from 'src/utils/common'
import { VAULT } from 'src/views/Vault/const'

const initState = {
  loading: false,
  configs: [],
  investors: [],
  investorTxs: [],
  vaults: null,
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
      const { vaults } = state
      const newVaults = loadShareStrategies(payload)
        .filter((vault) => !!VAULT[vault.name])
        .map((vault) => {
          const oldVault = vaults?.find((oldVault) => oldVault.id === vault.id)
          if (oldVault) {
            vault.strategies = oldVault.strategies
          }
          return mapVault(vault)
        })
      return {
        ...state,
        vaults: newVaults,
      }
    },
    [GET_POSITION_BY_ID]: (state, { payload }) => {
      const vaults = deepClone(state.vaults)
      vaults.forEach((vault) => {
        vault.strategies = vault.strategies.map((strategy) => {
          strategy.positions = strategy.positions.map((position) => {
            if (position.id === payload.id) {
              return mapPosition(payload)
            }
            return position
          })
          return mapStrategy(strategy)
        })
      })
      return {
        ...state,
        vaults,
      }
    },
    [GET_POSITION_HISTORIES]: (state, { payload }) => {
      return {
        ...state,
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

const loadShareStrategies = (vaults) => {
  const strategyMap = {}
  const poolStrategies = {}
  vaults.forEach((vault) => {
    vault.strategies.forEach((strategy) => {
      strategyMap[strategy.id] = strategy
      const { pool } = strategy
      if (!poolStrategies[pool.id]) {
        poolStrategies[pool.id] = strategy.id
      } else {
        strategy.share = true
        strategyMap[poolStrategies[pool.id]].share = true
      }
    })
  })
  return vaults
}
