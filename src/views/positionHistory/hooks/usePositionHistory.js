import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as appAction from 'src/actions/app'
import { mapPosition } from 'src/utils/apy'
import { deepClone } from 'src/utils/common'

export const usePositionHistory = () => {
  const dispatch = useDispatch()
  const { id: positionId } = useParams()
  const { protocolPositions, histories } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(appAction.getPositionHistory(positionId))
  }, [dispatch, positionId])

  if (!protocolPositions || !histories) {
    return null
  }

  let clonedPosition
  protocolPositions.forEach(({ positions }) => {
    const positionIndex = positions.findIndex(
      (position) => position.id === Number(positionId)
    )
    if (positionIndex > -1) {
      clonedPosition = deepClone(positions[positionIndex])
    }
  })

  clonedPosition.histories = clonedPosition.histories.concat(histories)
  return mapPosition(clonedPosition)
}
