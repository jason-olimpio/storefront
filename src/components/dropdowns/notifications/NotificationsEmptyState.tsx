import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { withBasePath } from '@/utils'

type NotificationsEmptyStateProps = {
  translations: ReturnType<typeof useTranslations<'NotificationsDropdown'>>
}

const NotificationsEmptyState = ({
  translations
}: NotificationsEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center mt-12">
    <Image
      width={100}
      height={100}
      src={withBasePath('/icons/navbar/notification/notification-bubbles.png')}
      alt="No notifications"
    />

    <p className="font-semibold text-sm text-center mt-4">
      {translations('noNotificationsFound')}
    </p>
  </div>
)

export default NotificationsEmptyState
