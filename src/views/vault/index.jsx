import './index.less'

import React from 'react'

import { useVault } from './hooks/useVault'
import Vault from './Vault'

const Vaults = () => {
  const vaults = useVault()

  if (!vaults) {
    return null
  }

  return (
    <div className="page">
      {vaults.map((vault) => (
        <Vault key={vault.id} vault={vault}></Vault>
      ))}
    </div>
  )
}

export default Vaults
