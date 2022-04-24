import './index.less'

import React from 'react'
import { Card } from 'antd'
import classnames from 'classnames'
import CapTooltip from 'src/components/CapTooltip'
import { BN, toPercentage } from 'src/utils/common'

const Summary = ({ vaults, selectedVaultName, selectVaultName }) => {
  if (!vaults) {
    return null
  }
  return (
    <div className="vault-summary">
      {vaults.map((vault) => {
        const decimalsBN = BN(`1e${vault.priceToken.decimals}`)
        const currentBalance = BN(vault.currentBalance)
          .div(decimalsBN)
          .toNumber()
        const unallocated = BN(vault.unallocated).div(decimalsBN).toNumber()
        return (
          <Card
            key={vault.id}
            size="small"
            title={`${vault.name} Vault`}
            style={{ width: 300 }}
            onClick={() => selectVaultName(vault.name)}
            className={classnames({
              'vault-summary-selected': selectedVaultName === vault.name,
            })}
          >
            <div>
              <div>Vault total</div>
              <div>
                <CapTooltip title={currentBalance}>
                  {currentBalance.toFixed(3)}
                </CapTooltip>
              </div>
            </div>
            <div>
              <div>Uninvested</div>
              <div>
                <CapTooltip title={unallocated}>
                  {Number(unallocated).toFixed(3)}
                </CapTooltip>
              </div>
            </div>
            <div>
              <div>Apy</div>
              <div>{toPercentage(vault.apy)}</div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default Summary
