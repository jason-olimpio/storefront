'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState, type ChangeEvent } from 'react'

import withAdminRedirect from '@/hoc/withAdminRedirect'
import { useUsersMutation, useUsersQuery } from '@/hooks/users'
import useSnackbarState from '@/hooks/useSnackbarState'
import { useUser } from '@/hooks'

import {
  LoadingSpinner,
  Snackbar,
  SearchBar,
  NoUsersMessage,
  UserList
} from '@/components'

import { Role } from '@/types'

const DEBOUNCE_MS = 300

const UsersPanel = () => {
  const t = useTranslations('UsersPanel')

  const [inputValue, setInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  )

  const { snackbar, show, close } = useSnackbarState()
  const { user: currentUser } = useUser()

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue)
      setCurrentPage(1)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [inputValue])

  const { data: paginatedUsers, isLoading } = useUsersQuery(
    searchTerm,
    currentPage
  )
  const updateRoleMutation = useUsersMutation(searchTerm, currentPage)

  const users = paginatedUsers?.users ?? []
  const filteredUsers = users.filter(user => user.id !== currentUser?.id)

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />

    if (!filteredUsers.length) return <NoUsersMessage />

    return (
      <UserList
        users={filteredUsers}
        openDropdownIndex={openDropdownIndex}
        onToggleDropdown={handleToggleDropdown}
        onRoleChange={handleRoleChange}
        totalPages={paginatedUsers?.totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    )
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value)

  const handleClearSearch = () => {
    setInputValue('')
    setSearchTerm('')
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => setCurrentPage(page)

  const handleToggleDropdown = (index: number) =>
    setOpenDropdownIndex(previousIndex =>
      previousIndex === index ? null : index
    )

  const handleRoleChange = (params: { userId: number; roleId: Role }) =>
    updateRoleMutation.mutate(params, {
      onSuccess: () =>
        show({
          message: t('roleUpdatedSuccessfully'),
          variant: 'success'
        })
    })

  return (
    <div className="m-10">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xl font-semibold">{t('title')}</p>

        <SearchBar
          searchTerm={inputValue}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />
      </div>

      <hr className="my-10 border-gray-300 dark:border-gray-600" />

      {renderContent()}

      <Snackbar {...snackbar} onClose={close} />
    </div>
  )
}

export default withAdminRedirect(UsersPanel)
