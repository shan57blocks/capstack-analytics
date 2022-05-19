import './index.less'

import { Button, Form, Input, message, Modal, Select, Space, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import api from 'src/utils/api'

import { Chains } from '../const'

const { Option } = Select

const Investor = () => {
  const dispatch = useDispatch()
  const { investors } = useSelector((state) => state.app)
  const [investor, setInvestor] = useState()
  const [form] = Form.useForm()

  const showAddInvestor = () => {
    setInvestor({})
    form.setFieldsValue({})
  }

  const showEditInvestor = (investor) => {
    setInvestor(investor)
    form.setFieldsValue(investor)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setInvestor()
    form.resetFields()
  }

  const onFinish = async (values) => {
    const method = values.id ? 'put' : 'post'
    // await api[method](`/investors`, values)
    // dispatch(appAction.getInvestors())
    handleCancel()
    message.success(`Investor has been created successfully.`)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text,
    },
    {
      title: 'Wallet',
      dataIndex: 'wallet',
      key: 'wallet',
    },
    {
      title: 'Chain',
      dataIndex: 'chain',
      key: 'chain',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditInvestor(record)}>Edit</a>
        </Space>
      ),
    },
  ]

  return (
    <div className="vault-investor">
      <Button
        className="vault-investor-add"
        type="primary"
        onClick={showAddInvestor}
      >
        Add
      </Button>
      <Table rowKey="id" columns={columns} dataSource={investors} bordered />
      <Modal
        title="Add Investor"
        visible={investor}
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
          <Form.Item name="id" className="investor-id">
            <Input />
          </Form.Item>
          <Form.Item
            label="Investor Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Wallet Address"
            name="wallet"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="chain" label="Chain" rules={[{ required: true }]}>
            <Select placeholder="Select chain" allowClear>
              {Object.values(Chains).map((chain) => {
                return (
                  <Option key={chain.id} value={chain.name}>
                    {chain.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Investor
