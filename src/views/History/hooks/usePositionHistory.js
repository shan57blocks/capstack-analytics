import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import useFetch from 'src/hooks/useFetch'
import positionService from 'src/views/service/position'

const usePositionHistory = () => {
  const { id: positionId } = useParams()
  const { protocols, pools, positions, currentPositions } = useSelector(
    (state) => state.app
  )
  const [positionHistories, setPositionHistories] = useState()

  useEffect(() => {
    const fetch = async () => {
      const positionHistories = await positionService.getPositionHistories(
        positionId
      )
      setPositionHistories(positionHistories)
    }
    fetch()
  }, [positionId])

  if (!positions || !protocols || !pools) {
    return {}
  }

  const totalHistories = positionHistories.concat(currentPositions)

  totalHistories.forEach((history) => {
    const startPosition = positions.find(
      (position) => position.id === history.positionId
    )
  })

  positions.forEach((position) => {
    const pool = pools.find((pool) => pool.id === position.poolId)
    position.pool = pool
    const histories = totalHistories.filter(
      (history) => history.positionId === position.id
    )
    // position.histories = histories.sort(sortTimestamp)
    position.currentHistory = position.histories[0]
  })

  const result = []

  protocols.forEach((protocol) => {
    const protocolPools = pools.filter(
      (pool) => pool.protocolId === protocol.id
    )
    const protocolPositions = positions.filter(
      (position) => !!protocolPools.find((pool) => pool.id === position.poolId)
    )
    const activePositions = protocolPositions.filter(
      (position) => !position.exit
    )
    const closedPositions = protocolPositions.filter(
      (position) => position.exit
    )
    if (activePositions.length) {
      result.push({
        protocol,
        status: 'active',
        positions: activePositions,
      })
    }
    if (closedPositions.length) {
      result.push({
        protocol,
        status: 'closed',
        positions: closedPositions,
      })
    }
  })

  return { positionInfos: result, positions }
}

export default usePositionHistory
