import './index.less'

import React from 'react'

import Positions from './Positions'
import PositionsClosed from './PositionsClosed'
import { useSelector } from 'react-redux'

const Position = () => {
  const { protocolPositions, protocolClosedPositions } = useSelector(
    (state) => state.app
  )

  return (
    <div className="page position">
      {/* <Positions protocolPositions={protocolPositions}></Positions>
      <PositionsClosed
        protocolPositions={protocolClosedPositions}
      ></PositionsClosed> */}
    </div>
  )
}

export default Position
