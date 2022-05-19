import './index.less'

import { Button, Form, Input, message, Modal, Select, Spin, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import api from 'src/utils/api'
import { formatTime } from 'src/utils/common'
import vaultService from 'src/views/service/vault'

const { Option } = Select

const Deposit = ({ vault }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [txForm] = Form.useForm()
  const [settleForm] = Form.useForm()
  const { investorTxs, investors } = useSelector((state) => state.app)
  const [addVisible, setAddVisible] = useState(false)
  const [status, setStatus] = useState()
  const [selectedTx, setSelectedTx] = useState()

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
    try {
      setLoading(true)
      await api.post(`/investors/transactions`, values)
      txForm.resetFields()
      dispatch(appAction.getInvestorTxs())
      dispatch(appAction.getVaults())
      message.success(`Transaction has been added successfully.`)
    } finally {
      setLoading(false)
    }
  }

  const onSettleFinish = async (values) => {
    setSelectedTx()
    try {
      setLoading(true)
      await vaultService.settleWithdrawl(vault, selectedTx, values.txHash)
      settleForm.resetFields()
      dispatch(appAction.getInvestorTxs())
      dispatch(appAction.getVaults())
      message.success(`Transaction has been settled successfully.`)
    } finally {
      setLoading(false)
    }
  }

  const onSettleDeposits = async () => {
    try {
      setLoading(true)
      // await vaultService.settleDeposits(vault.id)
      // dispatch(appAction.getInvestorTxs())
      // dispatch(appAction.getVaults())
      message.success(`Deposits have been settled successfully.`)
    } finally {
      setLoading(false)
    }
  }

  const onValuesChange = (values) => {
    if (values.status) {
      setStatus(values.status)
    }
  }

  if (!investorTxs || !investors || !vault) {
    return null
  }

  const txs = investorTxs.map((item) => {
    item.status = 'Invest Requested'
    return item
  })

  return (
    <div className="vault-transfer">
      <div className="vault-transfer-action">
        <Button
          className="vault-transfer-action-settle"
          onClick={onSettleDeposits}
          type="primary"
        >
          Next Step: Investment Suggestion
        </Button>
      </div>
      <Table
        columns={getColumns(investors, setSelectedTx)}
        dataSource={txs}
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
      {loading && <Spin />}
    </div>
  )
}

export default Deposit

const getColumns = (investors, selectTx) => [
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
      return <span>{amount}</span>
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
]
