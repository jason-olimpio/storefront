import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import type { AuthMode } from '@/components/auth/AuthForm'

import { loginUser, registerUser } from '@/api/services'

type Tokens = { accessToken: string; refreshToken: string }

type LoginVars = Parameters<typeof loginUser>[0]
type RegisterVars = Parameters<typeof registerUser>[0]
type AuthResponse =
  | Awaited<ReturnType<typeof loginUser>>
  | Awaited<ReturnType<typeof registerUser>>

const useAuthMutation = (
  mode: AuthMode,
  opts: {
    onSuccess: (tokens: Tokens) => void
    onErrorMessage: (message: string) => void
  }
) => {
  const translations = useTranslations(
    mode === 'register' ? 'Register' : 'Login'
  )

  return useMutation<AuthResponse, Error, LoginVars | RegisterVars>({
    mutationFn: data =>
      mode === 'register'
        ? registerUser(data as RegisterVars)
        : loginUser(data as LoginVars),

    onSuccess: ({ accessToken, refreshToken }) =>
      opts.onSuccess({
        accessToken: accessToken,
        refreshToken: refreshToken
      }),
    onError: error => opts.onErrorMessage(translations(error.message))
  })
}

export default useAuthMutation
