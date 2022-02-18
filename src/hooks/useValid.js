import { useCallback, useState } from 'react'
import { isNotEmpty } from 'src/utils/common'

const useValid = () => {
  const [valid, setValid] = useState(true)

  const checkStatus = useCallback((newValue) => {
    setValid(isNotEmpty(newValue))
  }, [])

  return [valid, checkStatus]
}

export default useValid
