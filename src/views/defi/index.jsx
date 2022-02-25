import './index.less'

import React from 'react'

import usePosition from './hooks/usePosition'
import Pool from './Pool'
import PoolClosed from './PoolClosed'

const Defi = () => {
  const positionInfos = usePosition()

  if (!positionInfos) return null

  return (
    <div className="page position">
      {positionInfos.map((positionInfo, index) => (
        <div key={index}>
          {positionInfo.status === 'closed' ? (
            <PoolClosed positionInfo={positionInfo}></PoolClosed>
          ) : (
            <Pool positionInfo={positionInfo}></Pool>
          )}
        </div>
      ))}
    </div>
  )
}

export default Defi
