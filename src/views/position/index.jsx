import './index.less'

import React from 'react'

import Positions from './Positions'
import PositionsClosed from './PositionsClosed'
import { useSelector } from 'react-redux'

const Position = () => {
  const { protocolPositions, protocolClosedPositions } = useSelector(
    (state) => state.app
  )

  if (!protocolPositions && !protocolClosedPositions) {
    return null
  }

  return (
    <div className="page position">
      {protocolPositions.map((protocolPosition, index) => (
        <div key={`position_${index}`}>
          <Positions protocolPosition={protocolPosition}></Positions>
        </div>
      ))}
      {protocolClosedPositions.map((protocolPosition, index) => (
        <div key={`closed_position_${index}`}>
          <PositionsClosed
            protocolPosition={protocolPosition}
          ></PositionsClosed>
        </div>
      ))}
    </div>
  )
}

export default Position
