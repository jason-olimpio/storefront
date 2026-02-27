import { useTranslations } from 'next-intl'

type QuickFillButtonsProps = {
  onFillAdmin: () => void
  onFillUser: () => void
}

const QuickFillButtons = ({
  onFillAdmin,
  onFillUser
}: QuickFillButtonsProps) => {
  const translations = useTranslations()

  return (
    <div className="mt-4 text-xs text-foreground-secondary dark:text-foreground-secondary-dark text-center">
      <p>{translations('Login.quickFill')}</p>

      <button
        type="button"
        onClick={onFillAdmin}
        className="text-link dark:text-link-dark hover:underline mr-2"
      >
        {translations('Roles.admin')}
      </button>

      <button
        type="button"
        onClick={onFillUser}
        className="text-link dark:text-link-dark hover:underline"
      >
        {translations('Roles.user')}
      </button>
    </div>
  )
}

export default QuickFillButtons
