import { useTranslations } from 'next-intl'

import { ChangeEvent } from 'react'

import { Input } from '@/components'

import { AuthFormData } from './AuthForm'

type AuthFormFieldsProps<TForm extends Record<string, any>> = {
  isRegister: boolean
  formData: AuthFormData
  errors: Partial<Record<keyof TForm, string>>
  onFieldChange: (
    field: keyof TForm
  ) => (event: ChangeEvent<HTMLInputElement>) => void
}

const AuthFormFields = <TForm extends AuthFormData>({
  isRegister,
  formData,
  errors,
  onFieldChange
}: AuthFormFieldsProps<TForm>) => {
  const translations = useTranslations(isRegister ? 'Register' : 'Login')

  return (
    <>
      {isRegister && (
        <Input
          label={translations('name')}
          type="text"
          value={formData.name || ''}
          onChange={onFieldChange('name')}
          required
          minLength={3}
          maxLength={30}
          error={errors.name}
        />
      )}

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={onFieldChange('email')}
        required
        minLength={5}
        maxLength={50}
        error={errors.email}
        className="mt-4"
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={onFieldChange('password')}
        required
        minLength={isRegister ? 8 : 1}
        maxLength={20}
        error={errors.password}
        className="mt-4"
      />
    </>
  )
}

export default AuthFormFields
