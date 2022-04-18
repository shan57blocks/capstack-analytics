import './index.less'

import { Button, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import api from 'src/utils/api'
import { deepClone } from 'src/utils/common'

const LIQUIDATION = 'Liquidation'
const HARVEST = 'Harvest'

const Config = ({ vault }) => {
  const [originConfigs, setOriginConfigs] = useState({})
  const [configs, setConfigs] = useState({})

  useEffect(() => {
    const fetch = async () => {
      const result = await api.get(`/configs/${vault}`)
      const configs = {}
      result.forEach((item) => {
        if (item.property.startsWith(LIQUIDATION)) {
          configs[LIQUIDATION] = item
        }
        if (item.property.startsWith(HARVEST)) {
          configs[HARVEST] = item
        }
      })
      setConfigs(configs)
      setOriginConfigs(configs)
    }
    fetch()
  }, [vault])

  const handleChange = (e, type) => {
    const newConfigs = deepClone(configs)
    newConfigs[type].value = e.target.value
    setConfigs(newConfigs)
  }

  const handleUpdate = async (type) => {
    const config = configs[type]
    const originConfig = originConfigs[type]
    if (config.value !== originConfig.value) {
      await api.put(`/configs`, config)
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
            value={configs[LIQUIDATION]?.value}
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
            value={configs[HARVEST]?.value}
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
