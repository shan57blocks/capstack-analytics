import './index.less'

import { Form, Input, message, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'
import { BN } from 'src/utils/common'
import api from 'src/utils/api'

const Profit = ({ vault }) => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = async (values) => {
    setIsModalVisible(false)
    await api.post(
      `/vaults/${vault.id}/profit-distribution?feeTxHash=${values.feeTxHash}`
    )
    message.success(`Profit has been distributed successfully.`)
  }

  if (!vault) {
    return null
  }

  return (
    <div className="vault-profit">
      <div className="vault-profit-title">Summary</div>
      <Table
        className="vault-profit-summary"
        columns={getSummaryColumns(showModal)}
        dataSource={[vault]}
        bordered
        rowKey="id"
        pagination={false}
      />

      <div className="vault-profit-title">Detail</div>
      <Table
        columns={getStrategyColumns(showModal)}
        dataSource={vault?.strategies}
        bordered
        rowKey="id"
        pagination={false}
      />
      <Modal
        title="Confirm Profit Distribution"
        visible={isModalVisible}
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
          <Form.Item
            label="Fee TX Hash"
            name="feeTxHash"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Profit

const getSummaryColumns = (showModal) => [
  {
    title: 'Principals',
    dataIndex: 'principals',
    key: 'principals',
    render: (_, record) => {
      let principals = BN(0)
      record.strategies.forEach((strategy) => {
        principals = principals.plus(BN(strategy.principals))
      })
      return <div>{principals.toString()}</div>
    },
  },
  {
    title: 'Total Profit',
    render: (_, record) => {
      let profit = BN(0)
      record.strategies.forEach((strategy) => {
        profit = profit.plus(BN(strategy.profit))
      })
      return <div>{profit.toString()}</div>
    },
  },
  {
    title: 'Total Management Fee',
    render: (_, record) => {
      let fee = BN(0)
      record.strategies.forEach((strategy) => {
        fee = fee.plus(BN(strategy.managementFee))
      })
      return <div>{fee.toString()}</div>
    },
  },
  {
    title: 'Total Performance Fee',
    render: (_, record) => {
      let fee = BN(0)
      record.strategies.forEach((strategy) => {
        fee = fee.plus(BN(strategy.performanceFee))
      })
      return <div>{fee.toString()}</div>
    },
  },
  {
    title: 'Total Fee',
    render: (_, record) => {
      let fee = BN(0)
      record.strategies.forEach((strategy) => {
        fee = fee
          .plus(BN(strategy.performanceFee))
          .plus(BN(strategy.managementFee))
      })
      return <div>{fee.toString()}</div>
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a onClick={showModal}>Confirm</a>
      </Space>
    ),
  },
]

const getStrategyColumns = () => [
  {
    title: 'Strategy',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Principals',
    dataIndex: 'principals',
    key: 'principals',
  },
  {
    title: 'Current',
    dataIndex: 'unallocated',
    key: 'unallocated',
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
  },
  {
    title: 'Management Fee',
    dataIndex: 'managementFee',
    key: 'managementFee',
  },
  {
    title: 'Performance Fee',
    dataIndex: 'performanceFee',
    key: 'performanceFee',
  },
]
