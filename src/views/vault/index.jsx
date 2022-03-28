import './index.less'

import React from 'react'

import { useVault } from './hooks/useVault'
import Vault from './Vault'

const Vaults = () => {
  const { vaults, strategies } = useVault()

  if (!vaults) {
    return null
  }

  return (
    <div className="page">
      {vaults.map((vault) => {
        const vaultStrategies = []
        vault.strategies.forEach((strategy) => {
          if (strategies[strategy.id]) {
            vaultStrategies.push(strategies[strategy.id])
          }
        })
        return (
          <Vault
            key={vault.id}
            vault={vault}
            strategies={vaultStrategies}
          ></Vault>
        )
      })}
    </div>
  )
}

export default Vaults
