import UserListItem from './UserListItem'

import PageNavigator from '@/components/ui/pagination/PageNavigator'

import { Role, User } from '@/types/models/user'

type UserListProps = {
  users?: User[]
  openDropdownIndex: number | null
  onToggleDropdown: (index: number) => void
  onRoleChange: (params: { userId: number; roleId: Role }) => void
  totalPages?: number
  currentPage: number
  onPageChange: (page: number) => void
}

const UserList = ({
  users,
  openDropdownIndex,
  onToggleDropdown,
  onRoleChange,
  totalPages,
  currentPage,
  onPageChange
}: UserListProps) => (
  <ul className="mb-2">
    {users?.map((user, index) => (
      <UserListItem
        key={user.id}
        user={user}
        index={index}
        isDropdownOpen={openDropdownIndex === index}
        onToggleDropdown={onToggleDropdown}
        onRoleChange={onRoleChange}
      />
    ))}

    <PageNavigator
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  </ul>
)

export default UserList
