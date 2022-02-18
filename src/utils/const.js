export const timeFormat = 'YYYY-MM-DD HH:mm'
export const dateFormat = 'YYYY-MM-DD'

export const formLayoutLogin = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

export const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

export const emptyLayout = {
  labelCol: {},
  wrapperCol: {},
}

export const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export const formItemHide = { visibility: 'hidden', height: 0, margin: 0 }

export const EntityStatus = {
  CREATE: '新增',
  EDIT: '编辑',
}

export const agentUrl = process.env.REACT_APP_AGENT_URL

export const useTypes = {
  exam: { id: '1', name: '考试名额' },
  upload: { id: '2', name: '上传中台协' },
}
