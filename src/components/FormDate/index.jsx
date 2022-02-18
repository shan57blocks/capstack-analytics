import { DatePicker, Form } from 'antd'
import React from 'react'

const FormDate = ({ label, name, disabledDate }) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required: true }]}>
      <DatePicker disabledDate={disabledDate} />
    </Form.Item>
  )
}

export default FormDate
