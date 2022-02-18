import { useCallback } from 'react'
import api from 'src/utils/api'
import { useDispatch } from 'react-redux'
import { showLoadingBar, closeLoadingBar } from 'src/actions/app'

const useMutation = () => {
  const dispatch = useDispatch()

  const mutate = useCallback(
    async (path, params, method) => {
      try {
        dispatch(showLoadingBar())
        const result = await api[method](path, params)
        return result
      } finally {
        dispatch(closeLoadingBar())
      }
    },
    [dispatch]
  )

  const postApi = useCallback(
    async (path, params) => {
      const result = await mutate(path, params, 'post')
      return result
    },
    [mutate]
  )

  const putApi = useCallback(
    async (path, params) => {
      const result = await mutate(path, params, 'put')
      return result
    },
    [mutate]
  )

  const deleteApi = useCallback(
    async (path) => {
      const result = await mutate(path, null, 'delete')
      return result
    },
    [mutate]
  )

  return { postApi, putApi, deleteApi }
}

export default useMutation
