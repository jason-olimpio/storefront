'use client'

import { useTranslations } from 'next-intl'
import { z } from 'zod'

import { useState } from 'react'

import { useAuthForm } from '@/hooks'

import { Snackbar, SubmitButton, ActionLink } from '@/components'

import ForgotPasswordModal from './ForgotPasswordModal'
import AuthFormFields from './AuthFormFields'
import QuickFillButtons from './QuickFillButtons'

type AuthFormProps = {
  mode: 'register' | 'login'
}

const createLoginSchema = () =>
  z.object({
    email: z.email(),
    password: z.string()
  })

const createRegisterSchema = (
  invalidName: string,
  passwordLength: string,
  passwordUppercase: string,
  passwordNumber: string,
  passwordSpecial: string
) =>
  z
    .object({
      email: z.email(),
      password: z.string()
    })
    .extend({
      name: z.string().regex(/^[a-zA-Z0-9 ]{3,50}$/, invalidName),
      password: z
        .string()
        .min(8, passwordLength)
        .regex(/[A-Z]/, passwordUppercase)
        .regex(/\d/, passwordNumber)
        .regex(/[^a-zA-Z0-9]/, passwordSpecial)
    })

const AuthForm = ({ mode }: AuthFormProps) => {
  const isRegister = mode === 'register'
  const translations = useTranslations(isRegister ? 'Register' : 'Login')
  const registerTranslations = useTranslations('Register')
  const loginTranslations = useTranslations('Login')

  const schema = isRegister
    ? createRegisterSchema(
        registerTranslations('invalidName'),
        registerTranslations('passwordLength'),
        registerTranslations('passwordUppercase'),
        registerTranslations('passwordNumber'),
        registerTranslations('passwordSpecial')
      )
    : createLoginSchema()

  const initialData = isRegister
    ? { email: '', password: '', name: '' }
    : { email: '', password: '' }

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
    isAuthenticated
  } = useAuthForm({
    isRegister,
    schema,
    initialData
  })

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  if (isAuthenticated) return

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

        <ActionLink
          introText={translations(isRegister ? 'existingUser' : 'newUser')}
          linkText={
            isRegister
              ? loginTranslations('login').toLowerCase()
              : translations('registerNow')
          }
          href={isRegister ? '/' : '/register'}
          className="mt-4"
        />

        <SubmitButton
          label={translations(isRegister ? 'register' : 'login')}
          className="mt-6"
          disabled={isPending}
        />

        {!isRegister && (
          <button
            type="button"
            onClick={() => setForgotPasswordOpen(true)}
            className="mt-6 uppercase text-link dark:text-link-dark
                       text-sm underline font-medium decoration-0"
          >
            {translations('forgottenPassword')}
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

export const RegisterForm = () => <AuthForm mode="register" />
export const LoginForm = () => <AuthForm mode="login" />
export default AuthForm
