import { message } from 'antd'
import moment from 'moment'

import { EntityStatus, useTypes } from './const'

/**
 * @param {*} value long值型的时间值
 * @format {*} format 时间格式
 */
export const formatTime = (value, format = 'YYYY-MM-DD') => {
  if (['string', 'number'].includes(typeof value)) {
    return moment(value).format(format)
  }

  if (Array.isArray(value)) {
    return value.map((item) => moment(item).format(format))
  }

  return []
}

export const findById = (obj, id, prop = 'id') => {
  const arrs = Array.isArray(obj) ? obj : Object.values(obj)
  return arrs.find((item) => item[prop] === id) ?? {}
}

export const getApiRootImg = () => process.env.REACT_APP_API_IMAGE

export const getDomain = () => process.env.REACT_APP_DOMAIN

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const isNotEmpty = (value) => {
  if (!value) return false
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (typeof value === 'boolean' || typeof value === 'number') return value
  if (value instanceof Object) return value

  return value.trim() !== ''
}

export const chineseDate = () => {
  const da = new Date()
  const year = da.getFullYear() + '年'
  const month = da.getMonth() + 1 + '月'
  const date = da.getDate() + '日'
  return [year, month, date].join('')
}

export const buildParameters = (path, parameters) => {
  path += '?'
  Object.keys(parameters).forEach((key) => {
    if (isNotEmpty(String(parameters[key]))) {
      path += `&${key}=${encodeURIComponent(parameters[key])}`
    }
  })
  return path
}

export const buildFormPath = (path, parameters) => {
  path += '?'
  Object.keys(parameters).forEach((key) => {
    path += `&${key}=${encodeURIComponent(parameters[key] ?? '')}`
  })
  return path
}

export const getStatus = (isEdit) => {
  return isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
}

// 复制指定内容
export const copyToClipboard = (clipboardContent) => {
  var textArea = document.createElement('textarea')
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = clipboardContent
  document.body.appendChild(textArea)
  textArea.select()
  try {
    var msg = document.execCommand('copy') ? '成功' : '失败'
    message.success('复制内容 ' + msg, 0.4)
  } catch (err) {
    message.error('不能使用这种方法复制内容')
  }
  document.body.removeChild(textArea)
}

export const findUseType = (useTypeId) => {
  return Object.values(useTypes).find((item) => item.id === String(useTypeId))
}
