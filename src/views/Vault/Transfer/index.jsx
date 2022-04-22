import './index.less'

import { Button, Form, Input, message, Modal, Select, Space, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import api from 'src/utils/api'
import { formatTime } from 'src/utils/common'

const { Option } = Select

const Transfer = ({ vault }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { investorTxs, investors } = useSelector((state) => state.app)
  const [settleVisible, setSettleVisible] = useState(false)
  const [addVisible, setAddVisible] = useState(false)
  const [status, setStatus] = useState()

  const showSettleModal = () => {
    setSettleVisible(true)
  }

  const handleSettleOk = () => {
    setSettleVisible(false)
  }

  const handleSettleCancel = () => {
    setSettleVisible(false)
  }

  const showAddModal = () => {
    setAddVisible(true)
  }

  const handleAddOk = () => {
    form.submit()
  }

  const handleAddCancel = () => {
    setAddVisible(false)
  }

  const onFinish = async (values) => {
    setAddVisible(false)
    values.vaultId = vault.id
    await api.post(`/investors/transactions`, values)
    form.resetFields()
    dispatch(appAction.getInvestorTxs())
    message.success(`Transaction been added successfully.`)
  }

  const onValuesChange = (values) => {
    if (values.status) {
      setStatus(values.status)
    }
  }

  if (!investorTxs || !investors || !vault) {
    return null
  }

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
        columns={getColumns(investors, showSettleModal)}
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
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
        visible={settleVisible}
        onOk={handleSettleOk}
        onCancel={handleSettleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="TX Hash" name="username">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Transfer

const getColumns = (investors, confirm) => [
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
          <a onClick={confirm}>Settle</a>
        )}
      </Space>
    ),
  },
]
