import React from 'react'

type ToggleButtonProps = {
  introText?: string
  buttonText: string
  onClick: () => void
  className?: string
}

const ToggleButton = ({
  introText,
  buttonText,
  onClick,
  className
}: ToggleButtonProps) => (
  <p
    className={`text-xs text-foreground dark:text-foreground-dark font-semibold mt-6 ${className}`}
  >
    {introText && `${introText} `}
    <button
      onClick={onClick}
      className="text-link dark:text-link-dark font-medium bg-transparent border-none cursor-pointer p-0 underline hover:opacity-80 inline"
      type="button"
    >
      {buttonText}
    </button>
    {introText && '.'}
  </p>
)

export default ToggleButton
