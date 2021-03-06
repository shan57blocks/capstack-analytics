import { BigNumber } from 'bignumber.js'
import moment from 'moment'

/**
 * @param {*} value long值型的时间值
 * @format {*} format 时间格式
 */
export const formatTime = (value, format = 'MM/DD/YYYY') => {
  if (!value) {
    return ''
  }
  return moment.unix(Number(value)).format(format)
}

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const isEmpty = (value) => {
  return value === undefined || value === null || Number.isNaN(value)
}

export const scaleDown = (num, decimals) => {
  return BN(num).div(`1e${decimals}`).toString()
}

export const toPercentage = (num) => {
  if (!num) {
    return null
  }
  return `${(num * 100).toFixed(2)}%`
}

export const BN = (number) => {
  return new BigNumber(number)
}
