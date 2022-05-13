import './index.less'

import { Button, Form, Input, message, Modal, Space, Spin, Table } from 'antd'
import React, { useState } from 'react'
import { BN } from 'src/utils/common'
import * as appAction from 'src/actions/app'

import { useDispatch } from 'react-redux'
import vaultService from 'src/views/service/vault'

const Profit = ({ vault, status }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
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
    try {
      setLoading(true)
      setIsModalVisible(false)
      await vaultService.profitDistribution(vault, values.feeTxHash)
      message.success(`Profit has been distributed successfully.`)
      dispatch(appAction.getVaults())
    } finally {
      setLoading(false)
    }
  }

  if (!vault) {
    return null
  }

  // if (vault.shares === '0') {
  //   return <div>Vault is empty.</div>
  // }

  // if (status[vault.name] === VAULT_STATUS.OPEN) {
  //   return <div>Please close all the positions first.</div>
  // }

  // if (status[vault.name] === VAULT_STATUS.SETTLED) {
  //   return <div>Please invest the positions first.</div>
  // }

  return (
    <div className="vault-profit">
      <div className="vault-profit-action">
        <Button type="primary">Next Step: Transfer Out</Button>
      </div>
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
      {loading && <Spin />}
    </div>
  )
}

export default Profit

const getSummaryColumns = (showModal) => [
  {
    title: 'Principals',
    dataIndex: 'principals',
    key: 'principals',
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
        if (strategy.managementFee) {
          fee = fee.plus(BN(strategy.managementFee))
        }
      })
      return <div>{fee.toString()}</div>
    },
  },
  {
    title: 'Total Performance Fee',
    render: (_, record) => {
      let fee = BN(0)
      record.strategies.forEach((strategy) => {
        if (strategy.performanceFee) {
          fee = fee.plus(BN(strategy.performanceFee))
        }
      })
      return <div>{fee.toString()}</div>
    },
  },
  {
    title: 'Total Fee',
    render: (_, record) => {
      let fee = BN(0)
      record.strategies.forEach((strategy) => {
        if (strategy.performanceFee) {
          fee = fee.plus(BN(strategy.performanceFee))
        }
        if (strategy.managementFee) {
          fee = fee.plus(BN(strategy.managementFee))
        }
      })
      return <div>{fee.toString()}</div>
    },
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
]
