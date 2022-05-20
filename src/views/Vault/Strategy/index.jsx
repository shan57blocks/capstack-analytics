import './index.less'

import { Table, Modal, Form, Input, Select, Spin, message, Button } from 'antd'
import React, { useState } from 'react'

import { getColumns } from './Column'
import { getPositionColumns } from './PositionColumn'
import { useDispatch, useSelector } from 'react-redux'
import { TXType, VAULT_STATUS } from '../const'
import vaultService from 'src/service/vault'
import * as appAction from 'src/actions/app'

const { confirm } = Modal

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
  const [swapHashes, setSwapHashes] = useState([{ id: 1 }])
  const { strategies } = vault || {}

  const showModal = (actionType, record) => {
    setActionType(actionType)
    setSelectedStrategy(record)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    clearSwapHash()
    setActionType()
    form.resetFields()
  }

  const addSwapHash = () => {
    setSwapHashes([...swapHashes, { id: swapHashes.length + 1 }])
  }

  const clearSwapHash = () => {
    setSwapHashes([{ id: 1 }])
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
    values.swapTxHashes = []
    Object.keys(values).forEach((key) => {
      if (key.startsWith('swapHash') && values[key]) {
        values.swapTxHashes.push(values[key])
      }
    })
    const positionId = values.positionId ?? selectedStrategy.positions[0].id
    try {
      setLoading(true)
      setActionType(null)
      await vaultService.harvestPosition(
        selectedStrategy.id,
        positionId,
        values
      )
      message.success('The position has been harvested successfully.')
      dispatch(appAction.getVaults())
    } finally {
      setLoading(false)
    }
  }

  const onAdjust = async (values) => {
    try {
      setLoading(true)
      setActionType(null)
      const positionId = values.positionId ?? selectedStrategy.positions[0].id
      await vaultService.adjustPosition(selectedStrategy.id, positionId, values)
      message.success('The position has been adjusted successfully.')
      dispatch(appAction.getVaults())
    } finally {
      setLoading(false)
    }
  }

  const onClose = async (values) => {
    values.swapTxHashes = []
    Object.keys(values).forEach((key) => {
      if (key.startsWith('swapHash') && values[key]) {
        values.swapTxHashes.push(values[key])
      }
    })
    const positionId = values.positionId ?? selectedStrategy.positions[0].id
    try {
      setLoading(true)
      setActionType(null)
      await vaultService.closePosition(selectedStrategy.id, positionId, values)
      message.success('The position has been closed successfully.')
      dispatch(appAction.getVaults())
    } finally {
      setLoading(false)
    }
  }

  const enterProfitDistribing = async () => {
    try {
      setLoading(true)
      await vaultService.enterProfitDistributing(vault.id)
      dispatch(appAction.getVaults())
      message.success(`Entering investment suggestion successfully.`)
    } finally {
      setLoading(false)
    }
  }

  const confirmEnterProfitDistribing = () => {
    const allClosed = vault.strategies.every((strategy) =>
      strategy.positions.every((position) => position.closed)
    )

    if (!allClosed) {
      message.warn('Please first close all the positions.')
      return
    }

    confirm({
      title: 'Are you sure to enter profit distributing?',
      onOk() {
        enterProfitDistribing()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  if (!strategies) {
    return null
  }

  return (
    <div className="vault-strategies">
      <div className="vault-strategies-action">
        {vault.status === VAULT_STATUS.Operating && (
          <Button type="primary" onClick={confirmEnterProfitDistribing}>
            Next Step: Profit Distribution
          </Button>
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
              <Form.Item label="Harvest Hash" name="harvestTxHash" required>
                <Input />
              </Form.Item>
              {swapHashes.map((swapHash) => {
                return (
                  <Form.Item
                    key={swapHash.id}
                    label={`Swap Hash ${swapHash.id}`}
                    name={`swapHash${swapHash.id}`}
                  >
                    <Input />
                  </Form.Item>
                )
              })}
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" onClick={addSwapHash}>
                  Add Swap Hash
                </Button>
              </Form.Item>
            </>
          )}
          {actionType === TXType.Adjust && (
            <>
              <Form.Item label="Harvest Hash" name="adjustTxHash" required>
                <Input />
              </Form.Item>
            </>
          )}
          {actionType === TXType.Close && (
            <>
              <Form.Item label="Close Hash" name="closeTxHash" required>
                <Input />
              </Form.Item>
              {swapHashes.map((swapHash) => {
                return (
                  <Form.Item
                    key={swapHash.id}
                    label={`Swap Hash ${swapHash.id}`}
                    name={`swapHash${swapHash.id}`}
                  >
                    <Input />
                  </Form.Item>
                )
              })}
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" onClick={addSwapHash}>
                  Add Swap Hash
                </Button>
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
          rowKey="id"
        />
      </div>
    )
  },
}
