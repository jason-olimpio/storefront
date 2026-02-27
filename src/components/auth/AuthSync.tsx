'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch, setAuthState } from '@/store'
import { getAccessToken } from '@/utils'

const AuthSync = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const token = getAccessToken()
    dispatch(setAuthState(!!token))
  }, [dispatch])

  return null
}

export default AuthSync
