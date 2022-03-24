import './index.less'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'

import { usePosition } from './hooks/usePosition'
import Positions from './Positions'

const Position = () => {
  const dispatch = useDispatch()
  const { protocols } = useSelector((state) => state.app)
  const { protocolOpenedPositions } = usePosition()

  useEffect(() => {
    protocols.forEach((protocol) => {
      dispatch(appAction.getProtocolPositions(protocol))
    })
  }, [dispatch, protocols])

  if (!protocolOpenedPositions) {
    return null
  }

  return (
    <div className="page position">
      {protocolOpenedPositions.map((protocolPosition, index) => (
        <div key={`position_${index}`}>
          <Positions protocolPosition={protocolPosition}></Positions>
        </div>
      ))}
    </div>
  )
}

export default Position
