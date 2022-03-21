import './index.less'

import React from 'react'
import { Link } from 'react-router-dom'
import logo from 'src/images/logo.png'

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt={logo} />
        </Link>
      </div>
      <div className="header-right">
        <div className="header-right__welcome">Capstack Analytics</div>
      </div>
    </div>
  )
}

export default Header
