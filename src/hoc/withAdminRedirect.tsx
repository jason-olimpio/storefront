import { ComponentType, useEffect } from 'react'
import { useLocale } from 'next-intl'

import useUser from '@/hooks/useUser'

import { Role } from '@/types/models/user'

import { useRouter } from '@/i18n/navigation'

const withAdminRedirect = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const ComponentWithAdminRedirect = (props: P) => {
    const { user } = useUser()
    const router = useRouter()
    const locale = useLocale()

    useEffect(() => {
      if (!user || user.role == Role.Admin) return

      router.push('/', { locale })
    }, [user, router, locale])

    return <WrappedComponent {...props} />
  }

  ComponentWithAdminRedirect.displayName = `withAdminRedirect(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return ComponentWithAdminRedirect
}

export default withAdminRedirect
