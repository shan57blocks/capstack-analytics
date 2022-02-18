import { Form, Input } from 'antd'
import React from 'react'
import { formItemHide } from 'src/utils/const'

const { TextArea } = Input

const FormInput = ({
  label,
  name,
  required,
  type,
  disabled,
  rules,
  hide,
  ...rest
}) => {
  const isDisabled = disabled === true
  let finalRules = [{ required: required ?? true }]
  if (rules) {
    finalRules = rules
  }

  return (
    <Form.Item
      rules={finalRules}
      label={label}
      name={name}
      style={hide ? formItemHide : {}}
    >
      {type === 'textarea' ? (
        <TextArea rows={2} disabled={isDisabled} {...rest} />
      ) : (
        <Input disabled={isDisabled} type={type} {...rest} />
      )}
    </Form.Item>
  )
}

export default FormInput
