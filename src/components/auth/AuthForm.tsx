'use client'

import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { useState } from 'react'
import { Snackbar, SubmitButton, ToggleButton } from '@/components'

import useAuthForm from '@/hooks/auth/useAuthForm'
import ForgotPasswordModal from './ForgotPasswordModal'
import AuthFormFields from './AuthFormFields'
import QuickFillButtons from './QuickFillButtons'

export type AuthMode = 'register' | 'login'
export type AuthFormData = {
  email: string
  password: string
  name?: string
}

const createSchema = (mode: AuthMode, tRegister: any) =>
  mode === 'register'
    ? z.object({
        email: z.email(),
        password: z
          .string()
          .min(8, tRegister('passwordLength'))
          .regex(/[A-Z]/, tRegister('passwordUppercase'))
          .regex(/\d/, tRegister('passwordNumber'))
          .regex(/[^a-zA-Z0-9]/, tRegister('passwordSpecial')),
        name: z.string().regex(/^[a-zA-Z0-9 ]{3,50}$/, tRegister('invalidName'))
      })
    : z.object({
        email: z.email(),
        password: z.string()
      })

const getInitialData = (mode: AuthMode): AuthFormData =>
  mode === 'register'
    ? { email: '', password: '', name: '' }
    : { email: '', password: '' }

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login')
  const loginTranslations = useTranslations('Login')
  const registerTranslations = useTranslations('Register')

  const schema = createSchema(mode, registerTranslations)
  const initialData = getInitialData(mode)

  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    snackbar,
    closeSnackbar,
    isPending,
    fillAdminCredentials,
    fillUserCredentials,
    isAuthenticated,
    setFormData
  } = useAuthForm<AuthFormData>({
    mode,
    schema,
    initialData
  })

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  const toggleMode = () => {
    const newMode = mode === 'register' ? 'login' : 'register'

    setMode(newMode)
    setFormData(getInitialData(newMode))
  }

  if (isAuthenticated) return

  const isRegister = mode === 'register'

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <AuthFormFields
          isRegister={isRegister}
          formData={formData}
          errors={errors}
          onFieldChange={handleChange}
        />

        {!isRegister && (
          <QuickFillButtons
            onFillAdmin={fillAdminCredentials}
            onFillUser={fillUserCredentials}
          />
        )}

        <ToggleButton
          introText={
            isRegister
              ? registerTranslations('existingUser')
              : loginTranslations('newUser')
          }
          buttonText={
            isRegister
              ? registerTranslations('login')
              : loginTranslations('registerNow')
          }
          onClick={toggleMode}
          className="mt-4 cursor-pointer hover:opacity-80"
        />

        <SubmitButton
          label={
            isRegister
              ? registerTranslations('register')
              : loginTranslations('login')
          }
          className="mt-6"
          disabled={isPending}
        />

        {!isRegister && (
          <button
            type="button"
            onClick={() => setForgotPasswordOpen(true)}
            className="mt-6 uppercase text-link dark:text-link-dark text-sm underline font-medium decoration-0"
          >
            {loginTranslations('forgottenPassword')}
          </button>
        )}
      </form>

      <Snackbar {...snackbar} onClose={closeSnackbar} variant="error" />

      {forgotPasswordOpen && (
        <ForgotPasswordModal onClose={() => setForgotPasswordOpen(false)} />
      )}
    </div>
  )
}

export default AuthForm
