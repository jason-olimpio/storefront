type QuickFillButtonsProps = {
  onFillAdmin: () => void
  onFillUser: () => void
}

const QuickFillButtons = ({
  onFillAdmin,
  onFillUser
}: QuickFillButtonsProps) => (
  <div className="mt-4 text-xs text-foreground-secondary dark:text-foreground-secondary-dark text-center">
    <p>Quick fill:</p>

    <button
      type="button"
      onClick={onFillAdmin}
      className="text-link dark:text-link-dark hover:underline mr-2"
    >
      Admin
    </button>

    <button
      type="button"
      onClick={onFillUser}
      className="text-link dark:text-link-dark hover:underline"
    >
      User
    </button>
  </div>
)

export default QuickFillButtons
