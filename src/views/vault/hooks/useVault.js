import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as vaultAction from 'src/actions/vault'
import { mapVault } from 'src/utils/apy'

export const useVault = () => {
  console.log(33)
  const dispatch = useDispatch()
  const [strategyFetched, setStrategyFetched] = useState(false)
  const {
    vaults,
    positionStrategies,
    strategyPositions,
    strategies,
  } = useSelector((state) => state.vault)

  useEffect(() => {
    dispatch(vaultAction.getVaults())
  }, [dispatch])

  useEffect(() => {
    if (vaults && !strategyFetched) {
      setStrategyFetched(true)
      vaults.forEach((vault) => {
        vault.strategies
          .filter((strategy) => !strategy.sharedPosition)
          .forEach((strategy) => {
            dispatch(vaultAction.getPositionsByStrategy(strategy.id))
          })
      })

      Object.keys(positionStrategies).forEach((positionId) => {
        const strategies = positionStrategies[positionId]
        if (strategies.length > 1) {
          const strategyIds = strategies.map((item) => item.id)
          dispatch(vaultAction.getPositionById(positionId, strategyIds))
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
      vaults: enhancedVaults,
      strategyPositions,
    }
  }

  return { vaults, strategyPositions }
}
