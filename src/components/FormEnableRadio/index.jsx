import { Form, Radio } from 'antd'
import React from 'react'

const FormEnableRadio = ({ label, name, initialValue = true }) => {
  return (
    <Form.Item
      initialValue={initialValue}
      rules={[{ required: true }]}
      label={label ?? '启用'}
      name={name ?? 'isEnable'}
    >
      <Radio.Group>
        <Radio value={true}>是</Radio>
        <Radio value={false}>否</Radio>
      </Radio.Group>
    </Form.Item>
  )
}

export default FormEnableRadio
