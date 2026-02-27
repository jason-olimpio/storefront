import { useTranslations } from 'next-intl'

import { Input } from '@/components'

type AuthFormFieldsProps = {
  isRegister: boolean
  formData: {
    email: string
    password: string
    name?: string
  }
  errors: {
    email?: string
    password?: string
    name?: string
  }
  onFieldChange: (
    field: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthFormFields = ({
  isRegister,
  formData,
  errors,
  onFieldChange
}: AuthFormFieldsProps) => {
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
