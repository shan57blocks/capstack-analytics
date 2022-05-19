import './index.less'

import { Table, Modal, Form, Input, Select, Spin, message, Button } from 'antd'
import React, { useState } from 'react'

import { getColumns } from './Column'
import { getPositionColumns } from './PositionColumn'
import { useDispatch, useSelector } from 'react-redux'
import { TXType, VAULT_STATUS } from '../const'
import vaultService from 'src/service/vault'
import * as appAction from 'src/actions/app'

const Strategy = ({ vault }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { configs } = useSelector((state) => state.app)
  const { value: harvestLimit } =
    configs.find((config) => config.property === `Harvest_${vault?.name}`) || {}
  const { value: liquidationLimit } =
    configs.find(
      (config) => config.property === `Liquidation_${vault?.name}`
    ) || {}
  const [actionType, setActionType] = useState()
  const [selectedStrategy, setSelectedStrategy] = useState()
  const { strategies } = vault || {}

  const showModal = (actionType, record) => {
    setActionType(actionType)
    setSelectedStrategy(record)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setActionType()
  }

  const onFinish = (values) => {
    if (actionType === TXType.Harvest) {
      onHarvest(values)
    }
    if (actionType === TXType.Adjust) {
      onAdjust(values)
    }
    if (actionType === TXType.Close) {
      onClose(values)
    }
  }

  const onHarvest = async (values) => {
    const payload = []
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        payload.push({
          hash: values[key],
          type: key === TXType.Harvest ? TXType.Harvest : TXType.Swap,
        })
      }
    })
    try {
      setLoading(true)
      setActionType(null)
      await vaultService.harvestPosition(vault, selectedStrategy, payload)
      message.success('The position has been harvested successfully.')
      dispatch(appAction.getVaults())
    } finally {
      setLoading(false)
    }
  }

  const onAdjust = async (values) => {
    const payload = []
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        payload.push({
          hash: values[key],
          type: key === TXType.Adjust ? TXType.Adjust : TXType.Swap,
        })
      }
    })
    try {
      setLoading(true)
      setActionType(null)
      await vaultService.adjustPosition(vault, selectedStrategy, payload)
      message.success('The position has been adjusted successfully.')
      dispatch(appAction.getVaults())
    } finally {
      setLoading(false)
    }
  }

  const onClose = async (values) => {
    const payload = []
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        payload.push({
          hash: values[key],
          type: key === TXType.Close ? TXType.Close : TXType.Swap,
        })
      }
    })
    try {
      setLoading(true)
      setActionType(null)
      await vaultService.closePosition(selectedStrategy, payload)
      message.success('The position has been adjusted successfully.')
      dispatch(appAction.getVaults())
    } finally {
      setLoading(false)
    }
  }

  if (!strategies) {
    return null
  }

  return (
    <div className="vault-strategies">
      <div className="vault-strategies-action">
        {vault.status === VAULT_STATUS.Operating && (
          <Button type="primary">Next Step: Profit Distribution</Button>
        )}
      </div>
      <Table
        columns={getColumns(showModal, harvestLimit, liquidationLimit)}
        dataSource={strategies.filter(
          (strategy) => !!strategy.positions.length
        )}
        pagination={false}
        rowKey="id"
        bordered
        expandable={expandable}
      />
      <Modal
        title="Strategy Operation"
        visible={actionType}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {actionType === TXType.Harvest && (
            <>
              {selectedStrategy.positions.length > 1 && (
                <Form.Item label="Position" name="positionId" required>
                  <Select>
                    {selectedStrategy.postions.map((position, index) => (
                      <Select.Option key={position.id} value={position.id}>
                        Position {index}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
              <Form.Item label="Harvest Hash" name={TXType.Harvest} required>
                <Input />
              </Form.Item>
              <Form.Item label="Swap Hash 1" name="swapHash1">
                <Input />
              </Form.Item>
              <Form.Item label="Swap Hash 2" name="swapHash2">
                <Input />
              </Form.Item>
              <Form.Item label="Swap Hash 3" name="swapHash3">
                <Input />
              </Form.Item>
            </>
          )}
          {actionType === TXType.Adjust && (
            <>
              <Form.Item label="Harvest Hash" name={TXType.Adjust} required>
                <Input />
              </Form.Item>
            </>
          )}
          {actionType === TXType.Close && (
            <>
              <Form.Item label="Close Hash" name={TXType.Close} required>
                <Input />
              </Form.Item>
              <Form.Item label="Swap Hash 1" name="swapHash1">
                <Input />
              </Form.Item>
              <Form.Item label="Swap Hash 2" name="swapHash2">
                <Input />
              </Form.Item>
              <Form.Item label="Swap Hash 3" name="swapHash3">
                <Input />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
      {loading && <Spin />}
    </div>
  )
}

export default Strategy

const expandable = {
  expandedRowRender: (strategy) => {
    const { pool, positions } = strategy
    const [firstPosition] = positions
    const tokenIndex = pool.tokens.findIndex(
      (token) => token.id === strategy.token.id
    )
    const tokenPrice = firstPosition?.currentHistory.assets[tokenIndex].price
    return (
      <div className="vault-strategies-positions">
        <div className="vault-strategies-positions-title">Positions</div>
        <Table
          columns={getPositionColumns(tokenPrice)}
          dataSource={positions}
          size="small"
          bordered
          pagination={false}
        />
      </div>
    )
  },
}
