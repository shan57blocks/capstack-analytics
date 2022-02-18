import { useMemo } from 'react'
import { useLocation } from 'react-router'

const useLogin = () => {
  const location = useLocation()
  const isLogin = useMemo(() => location.pathname.startsWith('/login'), [
    location.pathname,
  ])

  return isLogin
}

export default useLogin
