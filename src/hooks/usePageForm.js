import { useRouteMatch } from 'react-router'
import { getStatus } from 'src/utils/common'

const usePageForm = () => {
  const match = useRouteMatch()
  const entityId = match.params.id
  const isEdit = !!entityId
  const status = getStatus(isEdit)

  return [entityId, isEdit, status]
}

export default usePageForm
