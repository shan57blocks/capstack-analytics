import './index.less'

import { Select } from 'antd'
import React from 'react'
import logo from 'src/images/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'

const { Option } = Select

const Header = () => {
  const dispatch = useDispatch()
  const { accounts } = useSelector((state) => state.app)

  const selectAccount = (id) => {
    dispatch(appAction.selectAccount(id))
  }

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt={logo} />
        </Link>
      </div>
      <div className="header-right">
        <div className="header-right__welcome">Capstack Analytics</div>
        <div className="header-right__user">
          <div className="header-right__user-signout">
            <span>Account: </span>
            <Select
              defaultValue={accounts[0].id}
              style={{ width: 360 }}
              onChange={selectAccount}
            >
              {accounts.map((account) => (
                <Option key={account.id} value={account.id}>
                  {account.address}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
