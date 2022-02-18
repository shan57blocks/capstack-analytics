import { Form, InputNumber } from 'antd'
import React from 'react'
import './index.less'

const FormInputNum = ({
  label,
  name,
  required,
  type,
  suffix,
  rules = [],
  ...rest
}) => {
  const parsers = {
    integer: (value) => value.replace(/[^\d.]/g, ''),
  }

  const defaultRules = [{ required: required ?? true }]
  const finalRules = defaultRules.concat(rules)

  return (
    <Form.Item label={label} name={name} rules={finalRules}>
      <InputNumber
        className="form-input-number"
        formatter={(value) => `${value} ${suffix ?? ''}`}
        parser={parsers[type]}
        {...rest}
      />
    </Form.Item>
  )
}

export default FormInputNum
