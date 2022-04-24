import './index.less'

import { Button, Form, Input, message, Modal, Select, Space, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import api from 'src/utils/api'
import { BN, formatTime } from 'src/utils/common'

const { Option } = Select

const Transfer = ({ vault }) => {
  const dispatch = useDispatch()
  const [txForm] = Form.useForm()
  const [settleForm] = Form.useForm()
  const { investorTxs, investors } = useSelector((state) => state.app)
  const [addVisible, setAddVisible] = useState(false)
  const [status, setStatus] = useState()
  const [selectedTx, setSelectedTx] = useState()

  const showAddModal = () => {
    setAddVisible(true)
  }

  const handleAddOk = () => {
    txForm.submit()
  }

  const handleAddCancel = () => {
    setAddVisible(false)
  }

  const handleSettleOk = () => {
    settleForm.submit()
  }

  const onTxFinish = async (values) => {
    setAddVisible(false)
    values.vaultId = vault.id
    await api.post(`/investors/transactions`, values)
    txForm.resetFields()
    dispatch(appAction.getInvestorTxs())
    message.success(`Transaction has been added successfully.`)
  }

  const onSettleFinish = async (values) => {
    const tx = selectedTx
    setSelectedTx()
    await api.post(
      `/investors/transactions/${tx.id}/settlements?txHash=${values.txHash}`
    )
    settleForm.resetFields()
    dispatch(appAction.getInvestorTxs())
    message.success(`Transaction has been settled successfully.`)
  }

  const onValuesChange = (values) => {
    if (values.status) {
      setStatus(values.status)
    }
  }

  if (!investorTxs || !investors || !vault) {
    return null
  }

  const decimalsBN = BN(`1e${vault.priceToken.decimals}`)

  return (
    <div className="vault-transfer">
      <Button
        className="vault-transfer-add"
        onClick={showAddModal}
        type="primary"
      >
        Add
      </Button>
      <Table
        columns={getColumns(investors, setSelectedTx, decimalsBN)}
        dataSource={investorTxs}
        bordered
        rowKey="id"
      />
      <Modal
        title="Add Transfer"
        visible={addVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form
          form={txForm}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onTxFinish}
          onValuesChange={onValuesChange}
          autoComplete="off"
        >
          <Form.Item
            label="Investor"
            name="investorId"
            rules={[{ required: true }]}
          >
            <Select>
              {investors.map((investor) => {
                return (
                  <Option key={investor.id} value={investor.id}>
                    {investor.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value="Invest requested">Invest requested</Option>
              <Option value="Withdrawl requested">Withdrawl requested</Option>
            </Select>
          </Form.Item>
          {status === 'Invest requested' && (
            <Form.Item
              label="TX Hash"
              name="txHash"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          )}
          {status === 'Withdrawl requested' && (
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title="Settle Withdrawl"
        visible={!!selectedTx}
        onOk={handleSettleOk}
        onCancel={setSelectedTx}
      >
        <Form
          form={settleForm}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onSettleFinish}
          autoComplete="off"
        >
          <Form.Item label="TX Hash" name="txHash" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Transfer

const getColumns = (investors, selectTx, decimalsBN) => [
  {
    title: 'Investor',
    dataIndex: 'investorId',
    key: 'investorId',
    render: (investorId) => {
      const investor = investors.find((investor) => investor.id === investorId)
      return <div>{investor.name}</div>
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => {
      return <span>{BN(amount).div(decimalsBN).toString()}</span>
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Request Date',
    dataIndex: 'requestTime',
    key: 'requestTime',
    render: (requestTime) => {
      return <div>{formatTime(requestTime, 'MM/DD/YYYY HH:mm')}</div>
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {record.status === 'Withdrawl requested' && (
          <a onClick={() => selectTx(record)}>Settle</a>
        )}
      </Space>
    ),
  },
]
