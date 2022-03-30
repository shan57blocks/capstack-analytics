import './index.less'

import React from 'react'

import { useVault } from './hooks/useVault'
import PCV from './PCV'
import Vault from './Vault'

const Vaults = () => {
  const { vaults, pcvs } = useVault()

  if (!vaults) {
    return null
  }

  return (
    <div className="page">
      {vaults.map((vault) => {
        return <Vault key={vault.id} vault={vault}></Vault>
      })}
      <PCV vaults={pcvs}></PCV>
    </div>
  )
}

export default Vaults
