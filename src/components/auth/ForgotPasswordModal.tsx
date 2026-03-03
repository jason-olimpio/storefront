'use client'

import { ComponentProps } from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useMutation } from '@tanstack/react-query'

import { z } from 'zod'

import { ResetData } from './form/AuthForm'

import { SubmitButton, Input, Snackbar } from '@/components'

import { useForm, useSnackbarState } from '@/hooks'

import { forgotPassword } from '@/api/services'
import { withBasePath } from '@/utils'

type ForgotPasswordModalProps = {
  onClose: () => void
  onResetSuccess?: (data: ResetData) => void
}

const ForgotPasswordModal = ({
  onClose,
  onResetSuccess
}: ForgotPasswordModalProps) => {
  const translations = useTranslations('Login')

  const schema = z.object({
    email: z.email()
  })

  const { formData, errors, handleChange, validate } = useForm(schema, {
    email: ''
  })

  const { snackbar, show, close } = useSnackbarState()

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const token = await forgotPassword(email)

      return { token, email }
    },
    onSuccess: ({ token, email }) => {
      onResetSuccess?.({ email, token })
      onClose()
    },
    onError: (error: Error) => {
      show({
        message: translations(error.message),
        variant: 'error'
      })

      setTimeout(() => onClose(), 2000)
    }
  })

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = event => {
    event.preventDefault()

    if (!validate()) {
      close()
      return
    }

    forgotPasswordMutation.mutate(formData.email)
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary dark:bg-secondary-dark p-6 px-12 rounded-3xl shadow-lg max-w-md w-full relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-2 hover:bg-gray-100
                     dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Image
            src={withBasePath('/icons/close.svg')}
            alt="Close modal"
            width={15}
            height={15}
            className="dark:invert opacity-70"
          />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mt-5 mb-10">
            {translations('forgottenPassword')}
          </h2>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            required
            error={errors.email}
            variant="outline"
          />

          <SubmitButton
            label={translations('submit')}
            variant="thin"
            className="w-full my-5"
          />
        </form>

        <Snackbar {...snackbar} onClose={close} />
      </div>
    </div>
  )
}

export default ForgotPasswordModal
