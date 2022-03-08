import './index.less'

import React from 'react'

import Positions from './Positions'
import PositionsClosed from './PositionsClosed'
import { usePosition } from './hooks/usePosition'

const Position = () => {
  const { protocolOpenedPositions, protocolClosedPositions } = usePosition()
  if (!protocolOpenedPositions && !protocolClosedPositions) {
    return null
  }

  return (
    <div className="page position">
      {protocolOpenedPositions.map((protocolPosition, index) => (
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
