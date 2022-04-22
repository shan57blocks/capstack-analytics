import './index.less'

import { Button, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import api from 'src/utils/api'
import { deepClone } from 'src/utils/common'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'

const Config = ({ vaultName }) => {
  const dispatch = useDispatch()
  const LIQUIDATION = `Liquidation_${vaultName}`
  const HARVEST = `Harvest_${vaultName}`
  const { configs } = useSelector((state) => state.app)
  const [originConfigs, setOriginConfigs] = useState({})
  const [vaultConfigs, setVaultConfigs] = useState({})

  useEffect(() => {
    const vaultConfigs = {}
    configs.forEach((item) => {
      if (item.property === LIQUIDATION) {
        vaultConfigs[LIQUIDATION] = item
      }
      if (item.property === HARVEST) {
        vaultConfigs[HARVEST] = item
      }
    })
    setVaultConfigs(vaultConfigs)
    setOriginConfigs(vaultConfigs)
  }, [HARVEST, LIQUIDATION, configs, vaultName])

  const handleChange = (e, type) => {
    const newConfigs = deepClone(vaultConfigs)
    newConfigs[type].value = e.target.value
    setVaultConfigs(newConfigs)
  }

  const handleUpdate = async (type) => {
    const config = vaultConfigs[type]
    const originConfig = originConfigs[type]
    if (config.value !== originConfig.value) {
      await api.put(`/configs`, config)
      dispatch(appAction.getConfigs())
      message.success('Config has been updated successfully.')
    } else {
      message.warn('Config has not been changed.')
    }
  }

  return (
    <div className="vault-config">
      <div className="vault-config-item">
        <div className="vault-config-item-title">Liquidation Alert:</div>
        <Input.Group compact>
          <Input
            type="number"
            value={vaultConfigs[LIQUIDATION]?.value}
            onChange={(e) => handleChange(e, LIQUIDATION)}
            addonAfter="%"
          />
          <Button type="primary" onClick={() => handleUpdate(LIQUIDATION)}>
            Save
          </Button>
        </Input.Group>
      </div>
      <div className="vault-config-item">
        <div className="vault-config-item-title">Harvest Alert:</div>
        <Input.Group compact>
          <Input
            type="number"
            value={vaultConfigs[HARVEST]?.value}
            onChange={(e) => handleChange(e, HARVEST)}
            addonAfter="$"
          />
          <Button type="primary" onClick={() => handleUpdate(HARVEST)}>
            Save
          </Button>
        </Input.Group>
      </div>
    </div>
  )
}

export default Config
