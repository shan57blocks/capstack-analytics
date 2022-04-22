import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import { mapVault } from 'src/utils/apy'
import { VAULT } from '../const'

export const useVault = () => {
  const dispatch = useDispatch()
  const [strategyFetched, setStrategyFetched] = useState(false)
  const {
    vaults,
    positionStrategies,
    strategyPositions,
    strategies,
  } = useSelector((state) => state.app)

  useEffect(() => {
    if (vaults && !strategyFetched) {
      setStrategyFetched(true)
      vaults.forEach((vault) => {
        vault.strategies
          .filter((strategy) => !strategy.sharedPosition)
          .forEach((strategy) => {
            dispatch(appAction.getPositionsByStrategy(strategy.id))
          })
      })

      Object.keys(positionStrategies).forEach((positionId) => {
        const strategies = positionStrategies[positionId]
        if (strategies.length > 1) {
          const strategyIds = strategies.map((item) => item.id)
          dispatch(appAction.getPositionById(positionId, strategyIds))
        }
      })
    }
  }, [dispatch, strategyFetched, positionStrategies, vaults])

  if (vaults) {
    const enhancedVaults = vaults.map((vault) => {
      const vaultStrategies = []
      vault.strategies.forEach((strategy) => {
        if (strategies[strategy.id]) {
          vaultStrategies.push(strategies[strategy.id])
        }
      })
      return mapVault(vault, vaultStrategies)
    })

    return {
      vaults: enhancedVaults.filter((vault) => !!VAULT[vault.name]),
      pcvs: enhancedVaults.filter((vault) => !!!VAULT[vault.name]),
      strategies,
      strategyPositions,
    }
  }

  return {}
}
