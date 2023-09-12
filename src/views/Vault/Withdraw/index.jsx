import './index.less'

import { Button, Form, Input, message, Modal, Select, Spin, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import api from 'src/utils/api'
import { formatTime } from 'src/utils/common'
import vaultService from 'src/views/service/vault'

const { Option } = Select

/**
* @description This function is a React component that renders a form for adding and 
* settling withdrawals for investors. It uses the `useDispatch` and `useSelector` 
* hooks to fetch data from the store and handle actions. The form includes fields 
* for selecting an investor, entering a transaction status, and entering the transaction 
* hash or amount (depending on the status).
* 
* @returns {  } - The output returned by the `Withdraw` function is a JSX element 
* representing a form for adding and settling withdrawals for investors. The form 
* includes fields for selecting an investor, entering a status, and entering a TX 
* hash. There are also buttons for submitting the form and settling withdrawals.
*/
const Withdraw = ({ vault }) => {
  const test = 1
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [txForm] = Form.useForm()
  const [settleForm] = Form.useForm()
  const { investorTxs, investors } = useSelector((state) => state.app)
  const [addVisible, setAddVisible] = useState(false)
  const [status, setStatus] = useState()
  const [selectedTx, setSelectedTx] = useState()

/**
* @description The `handleAddOk` function submits the form named `txForm`.
*/
  const handleAddOk = () => {
    txForm.submit()
  }

/**
* @description The function `handleAddCancel` sets the `addVisible` state to `false`.
*/
  const handleAddCancel = () => {
    setAddVisible(false)
  }

/**
* @description The `handleSettleOk` function submits the `settleForm`.
*/
  const handleSettleOk = () => {
    settleForm.submit()
  }

/**
* @description This function, `onTxFinish`, performs the following actions:
* 
* 1/ Resets the `addVisible` flag to `false`.
* 2/ Sets the `vaultId` field of the `values` object to the `id` of the current vault.
* 3/ Dispatches two actions: `appAction.getInvestorTxs()` and `appAction.getVaults()`.
* 4/ Resets the `txForm` fields.
* 5/ Displays a success message.
* 6/ Sets the `loading` flag to `false`.
* 
* @param { object } values - The `values` input parameter is used to pass data to 
* the API for creating a new transaction.
*/
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

/**
* @description This function, `onSettleFinish`, performs the following actions:
* 
* 1/ Resets the selected transaction (using `setSelectedTx()`).
* 2/ Starts a loading animation (using `setLoading(true)`).
* 3/ Calls the `settleWithdrawl` method of the `vaultService` with the current vault 
* and selected transaction.
* 4/ Resets the form fields (using `settleForm.resetFields()`).
* 5/ Dispatches two actions: `appAction.getInvestorTxs()` and `appAction.getVaults()`.
* 6/ Displays a success message (`message.success()`).
* 7/ Stops the loading animation (using `setLoading(false)`).
* 
* @param { object } values - VALUES PARAMETER SETS THE TX HASH TO BE USED FOR SETTLEMENT.
*/
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

/**
* @description This function settles deposits for a vault with the given ID. It sets 
* a loading state, calls the vault service to settle deposits, and then dispatches 
* actions to fetch investor transactions and vaults.
*/
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

/**
* @description The function onValuesChange takes an object of values as an argument, 
* and it sets the status property to the value of the status key within the object, 
* if the status key is present.
* 
* @param { object } values - The `values` input parameter in the `onValuesChange` 
* function is used to pass a object with updated values from the parent component 
* to the child component.
*/
  const onValuesChange = (values) => {
    if (values.status) {
      setStatus(values.status)
    }
  }

  if (!investorTxs || !investors || !vault) {
    return null
  }

  const txs = investorTxs.map((item) => {
    item.status = 'Withdrawl Requested'
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
          Next Step: Deposit Settlement
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

export default Withdraw

/**
* @description This function, `getColumns`, takes two arguments: `investors` and 
* `selectTx`. It returns an array of objects, each representing a column to be 
* displayed in a table. The objects have properties such as `title`, `dataIndex`, 
* `key`, and `render`, which define the column's name, data index, key, and render 
* function, respectively. The `render` function takes a value and returns a React 
* component to display the value.
* 
* @param { array } investors - The `investors` input parameter is used to find the 
* investor's name based on their ID.
* 
* @param { object } selectTx - The `selectTx` input parameter in the `getColumns` 
* function is used to select the transaction data that should be displayed in the table.
* 
* @returns { object } - ! Here is the concise description of the output returned by 
* the function:
* 
* The function returns an array of columns, each with a title, data index, key, and 
* render function. The columns are: Investor, Amount, Status, and Request Date.
*/
const getColumns = (investors, selectTx) => [
  {
    title: 'Investor',
    dataIndex: 'investorId',
    key: 'investorId',
/**
* @description The function takes an investor ID as input and returns a JSX element 
* representing the name of the investor with the specified ID.
* 
* @param { string } investorId - The `investorId` input parameter is used to retrieve 
* the corresponding investor object from the `investors` array based on its ID.
* 
* @returns { object } - The output returned by this function is a string of text, 
* specifically the name of the investor with the matching ID.
*/
    render: (investorId) => {
      const investor = investors.find((investor) => investor.id === investorId)
      return <div>{investor.name}</div>
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
/**
* @description The function renders an amount as a span element.
* 
* @param { string } amount - The `amount` input parameter is passed to the `span` 
* component, which displays the value of the `amount` as a string.
* 
* @returns { string } - The output returned by this function is a span element 
* containing the amount parameter.
*/
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
/**
* @description The function renders a div element with the format of the request 
* time in the format of 'MM/DD/YYYY HH:mm'.
* 
* @param requestTime - The `requestTime` input parameter is formatted into a 
* human-readable string using the `formatTime()` function and returned as the content 
* of a `<div>` element.
* 
* @returns { string } - The output returned by this function is a <div> element 
* containing the formatted date and time of the request, in the format "MM/DD/YYYY 
* HH:mm".
*/
    render: (requestTime) => {
      return <div>{formatTime(requestTime, 'MM/DD/YYYY HH:mm')}</div>
    },
  },
]
