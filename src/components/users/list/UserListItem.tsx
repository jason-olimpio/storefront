'use client'

import { useCallback } from 'react'

import { RoleDropdown, UserInfo } from '@/components'

import { User, Role } from '@/types/models/user'

type UserListItemProps = {
  user: User
  index: number
  isDropdownOpen: boolean
  onToggleDropdown: (index: number) => void
  onRoleChange: (params: { userId: number; roleId: Role }) => void
}

const UserListItem = ({
  user,
  index,
  isDropdownOpen,
  onToggleDropdown,
  onRoleChange
}: UserListItemProps) => {
  const handleRoleChange = useCallback(
    (roleId: Role) => {
      if (user.id) onRoleChange({ userId: user.id, roleId })
    },
    [user.id, onRoleChange]
  )

  return (
    <li
      className="flex flex-col sm:flex-row justify-between items-center px-5 py-3 mb-6
                  bg-secondary dark:bg-secondary-dark max-w-lg shadow-md shadow-secondary
                  dark:shadow-secondary-dark rounded-2xl"
    >
      <UserInfo user={user} />

      <RoleDropdown
        role={user.role}
        onRoleChange={handleRoleChange}
        isOpen={isDropdownOpen}
        toggleDropdown={() => onToggleDropdown(index)}
      />
    </li>
  )
}

export default UserListItem
