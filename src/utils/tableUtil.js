import { Button, Divider, Switch, Avatar } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { copyToClipboard, formatTime, getDomain } from './common'

export const tableOrder = {
  title: '序号',
  key: 'index',
  render: (text, record, index) => `${index + 1}`,
}

export const getRow = (title, name, width) => ({
  title,
  dataIndex: name,
  key: name,
  width,
})

export const getDateRow = (title, name) => ({
  title,
  dataIndex: name,
  key: name,
  render: (text, record) => <span>{formatTime(record[name])}</span>,
})

export const getLinkRow = (title, link) => {
  return {
    title,
    render: (text, record) => {
      let finalLink = link
      const linkArr = link.split('/')
      linkArr.forEach((item) => {
        if (item.startsWith(':')) {
          finalLink = finalLink.replace(item, record[item.split(':')[1]])
        }
      })
      return <Link to={finalLink}>查看</Link>
    },
  }
}

export const getExternalLinkRow = (url) => ({
  title: '链接',
  dataIndex: 'hashcode',
  key: 'hashcode',
  render: (text, record) => {
    const link = `${url}${record.hashCode}`
    return (
      <span>
        <Button size="small" onClick={() => window.open(link, '_blank')}>
          打开
        </Button>
        <Button
          style={{ marginLeft: '5px' }}
          size="small"
          onClick={() => copyToClipboard(link)}
        >
          复制
        </Button>
      </span>
    )
  },
})

export const getEnableRow = () => ({
  title: '已启用',
  dataIndex: 'isEnable',
  key: 'isEnable',
  render: (text, record) => <span>{record.isEnable ? '是' : '否'}</span>,
})

export const getSwitchRow = (update, title) => ({
  title: title ?? '状态',
  key: 'isEnable',
  render: (text, record) => {
    return (
      <Switch
        onChange={() => update(record)}
        checkedChildren="启用"
        unCheckedChildren="禁用"
        checked={record.isEnable}
      />
    )
  },
})

export const changePsdAction = (selectEntity) => (record) => (
  <span className="table-action" onClick={() => selectEntity(record)}>
    修改密码
  </span>
)

export const getActionRow = (getPath, deleteEntity, customAction) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <>
      <Link to={getPath(record)}>编辑</Link>
      {customAction && (
        <>
          <Divider type="vertical" />
          {customAction(record)}
        </>
      )}
      {deleteEntity && (
        <>
          <Divider type="vertical" />
          <span
            className="table-action"
            onClick={() => {
              deleteEntity(record)
            }}
          >
            删除
          </span>
        </>
      )}
    </>
  ),
})

export const getViewRow = (title, callback) => ({
  title,
  render: (text, record) => {
    return (
      <span>
        <Button size="small" onClick={() => callback(record)}>
          查看{title}
        </Button>
      </span>
    )
  },
})

export const getDeleteRow = (deleteEntity) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span
      className="table-action"
      onClick={() => {
        deleteEntity(record)
      }}
    >
      删除
    </span>
  ),
})

export const getDetailRow = (getPath) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => <Link to={getPath(record)}>详情</Link>,
})

export const getAvatarRow = () => ({
  title: '头像',
  render: (text, record) => (
    <Avatar size={45} src={`${getDomain()}${record.faceUrl}`} />
  ),
})

export const getCustomRow = (title, getValue, width) => ({
  title,
  width,
  render: (text, record) => <span>{getValue(record)}</span>,
})
