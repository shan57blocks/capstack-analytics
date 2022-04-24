import './index.less'

import { Table, Modal, Form, Input, Select } from 'antd'
import React, { useState } from 'react'

import { getColumns } from './Column'
import { positionColumns } from './PositionColumn'
import { useSelector } from 'react-redux'

const Strategy = ({ vault }) => {
  const { configs } = useSelector((state) => state.app)
  const { value: harvestLimit } =
    configs.find((config) => config.property === `Harvest_${vault?.name}`) || {}
  const { value: liquidationLimit } =
    configs.find(
      (config) => config.property === `Liquidation_${vault?.name}`
    ) || {}
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { strategies } = vault || {}

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

  if (!strategies) {
    return null
  }

  return (
    <div className="vault-strategies">
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
          <Form.Item label="Select Position" name="type">
            <Select />
          </Form.Item>
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

export default Strategy

const expandable = {
  expandedRowRender: (record) => (
    <div className="vault-strategies-positions">
      <div className="vault-strategies-positions-title">Positions</div>
      <Table
        columns={positionColumns}
        dataSource={record.positions}
        size="small"
        bordered
        pagination={false}
      />
    </div>
  ),
}
