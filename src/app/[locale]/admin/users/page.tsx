'use client'

import { useTranslations } from 'next-intl'
import { useState, ChangeEvent, useEffect } from 'react'

import { useUsersMutation, useUsersQuery } from '@/hooks/users'

import withAdminRedirect from '@/hoc/withAdminRedirect'

import {
  LoadingSpinner,
  Snackbar,
  SearchBar,
  NoUsersMessage,
  UserList
} from '@/components'

import useSnackbarState from '@/hooks/useSnackbarState' // ✅ New import

import { Role } from '@/types'
import { useUser } from '@/hooks'

const UsersPanel = () => {
  const translations = useTranslations('UsersPanel')
  const [inputValue, setInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  )

  const { snackbar, show, close } = useSnackbarState()

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue)
      setCurrentPage(1)
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue])

  const { data: paginatedUsers, isLoading } = useUsersQuery(
    searchTerm,
    currentPage
  )

  const { user: currentUser } = useUser()

  const updateRoleMutation = useUsersMutation(searchTerm, currentPage)

  const handleRoleChange = (params: { userId: number; roleId: Role }) => {
    updateRoleMutation.mutate(params, {
      onSuccess: () =>
        show({
          message: translations('roleUpdatedSuccessfully'),
          variant: 'success'
        })
    })
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleClearSearch = () => {
    setInputValue('')
    setSearchTerm('')
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => setCurrentPage(page)

  const handleToggleDropdown = (index: number) =>
    setOpenDropdownIndex(previousState =>
      previousState === index ? null : index
    )

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="m-10">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xl font-semibold">{translations('title')}</p>

        <SearchBar
          searchTerm={inputValue}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />
      </div>

      <hr className="my-10 border-gray-300 dark:border-gray-600" />

      {paginatedUsers?.users.length ? (
        <UserList
          users={paginatedUsers.users.filter(
            user => user.id !== currentUser?.id
          )}
          openDropdownIndex={openDropdownIndex}
          onToggleDropdown={handleToggleDropdown}
          onRoleChange={handleRoleChange}
          totalPages={paginatedUsers.totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <NoUsersMessage />
      )}

      <Snackbar {...snackbar} onClose={close} />
    </div>
  )
}

export default withAdminRedirect(UsersPanel)
