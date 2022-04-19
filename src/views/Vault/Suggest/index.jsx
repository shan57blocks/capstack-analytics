import './index.less'

import { Form, Input, InputNumber, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import CapSkeleton from 'src/components/CapSkeleton'
import { toPercentage } from 'src/utils/common'

const Suggest = ({ vault }) => {
  const [strategies, setStrategies] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const unallocated = vault ? Number(vault.unallocated) : 0

  useEffect(() => {
    setStrategies(renforceStrategies(vault, vault?.strategies))
  }, [vault])

  const changeLeverage = (leverage, strategyId) => {
    const newStrategies = strategies.map((item) => {
      if (item.id === strategyId) {
        item.leverage = leverage
      }
      return item
    })
    setStrategies(renforceStrategies(vault, newStrategies))
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  if (!vault) {
    return <CapSkeleton />
  }

  return (
    <div className="vault-suggest">
      <div className="vault-suggest-change">
        <div>Uninvested:</div>
        <div>{unallocated}</div>
      </div>
      <Table
        rowKey="id"
        columns={getColumns(vault, changeLeverage, showModal)}
        dataSource={strategies}
        bordered
      />
      <Modal
        title="Open Position"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="TX Hash 1" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="TX Hash 2" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="TX Hash 3" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="TX Hash 4" name="type">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Suggest

const getColumns = (vault, changeLeverage, showModal) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Protocol',
    dataIndex: 'positions',
    render: (positions) => {
      const [{ protocol }] = positions
      return (
        <div>
          {protocol.name} ({protocol.chain})
        </div>
      )
    },
  },
  {
    title: 'Target',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (percentage) => {
      return <div>{toPercentage(percentage)}</div>
    },
  },
  {
    title: 'Target Change',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (percentage) => {
      return <div>{Number(vault.unallocated) * Number(percentage)}</div>
    },
  },
  {
    title: 'Leverage',
    dataIndex: 'leverage',
    key: 'leverage',
    width: 160,
    render: (leverage, strategy) => {
      return (
        <InputNumber
          min={1}
          width={80}
          step={0.1}
          value={leverage}
          onChange={(value) => changeLeverage(value, strategy.id)}
        ></InputNumber>
      )
    },
  },
  {
    title: 'Suggestion',
    dataIndex: 'suggestions',
    key: 'suggestions',
    render: (suggestions) => {
      return (
        <div>
          {suggestions.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      )
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={showModal}>Open Position</a>
      </Space>
    ),
  },
]

const renforceStrategies = (vault, strategies) => {
  if (!vault) {
    return []
  }
  return strategies.map((strategy) => {
    strategy.principal = Number(vault.unallocated) * strategy.percentage
    strategy.suggestions = []
    strategy.leverage = strategy.leverage ?? 3
    if (strategy.positions.length > 1) {
      const principal0 =
        (strategy.principal * strategy.leverage) / (2 * strategy.leverage - 2)
      const principal1 =
        (strategy.principal * (strategy.leverage - 2)) /
        (2 * strategy.leverage - 2)
      strategy.suggestions.push(
        `Invest ${principal0} ${vault.name} in first position`
      )
      strategy.suggestions.push(
        `Invest ${principal1} ${vault.name} in second position`
      )
    } else {
      const [{ tokens }] = strategy.positions
      const borrowRate0 = (strategy.leverage / 2 - 1).toFixed(2)
      const borrowRate1 = (strategy.leverage / 2).toFixed(2)
      strategy.suggestions.push(
        `Borrow ${borrowRate0}X ${vault.name} for ${tokens[0].symbol}`
      )
      strategy.suggestions.push(
        `Borrow ${borrowRate1}X ${vault.name} for ${tokens[1].symbol}`
      )
    }
    return strategy
  })
}
