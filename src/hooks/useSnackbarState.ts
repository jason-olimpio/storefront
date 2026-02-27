'use client'

import { useState } from 'react'

type SnackbarState = {
  open: boolean
  message: string
  variant: 'error' | 'success' | 'info'
}

const useSnackbarState = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    variant: 'info'
  })

  const close = () =>
    setSnackbar(previousState => ({ ...previousState, open: false }))

  const show = (next: Omit<SnackbarState, 'open'>) =>
    setSnackbar({ open: true, ...next })

  return { snackbar, show, close }
}

export default useSnackbarState
