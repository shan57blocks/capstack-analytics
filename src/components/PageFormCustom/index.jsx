import React from 'react'
import { Form } from 'antd'
import { formLayout } from 'src/utils/const'
import { getStatus } from 'src/utils/common'
import FormBottom from 'src/components/FormBottom'
import { useRouteMatch } from 'react-router'
import useActiveRoute from 'src/hooks/useActiveRoute'

const PageFormCustom = ({
  children,
  title,
  fullTitle,
  customClass,
  form,
  onFinish,
  back,
  onFieldsChange,
  onValuesChange,
}) => {
  const match = useRouteMatch()
  const { title: defaultTitle, back: defaultBack } = useActiveRoute()
  const [defaultForm] = Form.useForm()
  const entityId = match.params.id
  const isEdit = !!entityId
  const status = getStatus(isEdit)
  if (!title) {
    title = defaultTitle
  }

  const finalTitle = fullTitle ?? `${status}${title}`

  return (
    <div className={`page jjt-form ${customClass}`}>
      <div className="jjt-form-title">{finalTitle}</div>
      <Form
        {...formLayout}
        form={form ?? defaultForm}
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        onValuesChange={onValuesChange}
      >
        {children}
        <FormBottom path={back ?? defaultBack} />
      </Form>
    </div>
  )
}

export default PageFormCustom
