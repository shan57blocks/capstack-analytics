import './index.less'

import React from 'react'
import { Card } from 'antd'
import classnames from 'classnames'
import CapTooltip from 'src/components/CapTooltip'
import { toPercentage } from 'src/utils/common'

const Summary = ({ vaults, selectedVaultName, selectVaultName }) => {
  if (!vaults) {
    return null
  }
  return (
    <div className="vault-summary">
      {vaults.map((vault) => {
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
                <CapTooltip title={vault.currentBalance}>
                  {vault.currentBalance.toFixed(3)}
                </CapTooltip>
              </div>
              <div>$200000</div>
            </div>
            <div>
              <div>Uninvested</div>
              <div>
                <CapTooltip title={vault.unallocated}>
                  {Number(vault.unallocated).toFixed(3)}
                </CapTooltip>
              </div>
              <div>$40000</div>
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
