import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as vaultAction from 'src/actions/vault'

export const useVault = () => {
  const dispatch = useDispatch()
  const { vaults, positionStrategies, strategyPositions } = useSelector(
    (state) => state.vault
  )

  console.log(strategyPositions)

  useEffect(() => {
    dispatch(vaultAction.getVaults())
  }, [dispatch])

  useEffect(() => {
    if (vaults) {
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
  }, [dispatch, positionStrategies, vaults])

  if (vaults) {
  }

  return vaults
}
