import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import * as appAction from 'src/actions/app'
import { mapPosition } from 'src/utils/apy'
import { deepClone } from 'src/utils/common'

export const usePositionHistory = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id: positionId } = useParams()
  const { protocolPositions, histories } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(appAction.getPositionHistory(positionId))
  }, [dispatch, positionId])

  if (!protocolPositions || !histories) {
    return {}
  }

  let clonedProtocol
  let clonedPosition
  protocolPositions.forEach(({ protocol, positions }) => {
    const positionIndex = positions.findIndex(
      (position) => position.id === Number(positionId)
    )
    if (positionIndex > -1) {
      clonedProtocol = deepClone(protocol)
      clonedPosition = deepClone(positions[positionIndex])
    }
  })

  if (!clonedPosition) {
    history.push('/')
    return {}
  }

  clonedPosition.histories = clonedPosition.histories.concat(histories)
  return { position: mapPosition(clonedPosition), protocol: clonedProtocol }
}
