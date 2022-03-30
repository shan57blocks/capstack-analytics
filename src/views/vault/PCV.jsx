import './index.less'

import React from 'react'

import PCVSummary from './PCVSummary'
import Strategy from './Strategy'

const PCV = ({ vaults }) => {
  const strategies = []
  vaults.forEach((vault) => {
    strategies.push(...vault.strategies)
  })
  return (
    <div className="vault">
      <div className="vault-name">PCV</div>
      <div className="vault-summary">Summary</div>
      <PCVSummary vaults={vaults} type="PCV"></PCVSummary>
      <div className="vault-strategies">Strategies</div>
      <Strategy strategies={strategies}></Strategy>
    </div>
  )
}

export default PCV
