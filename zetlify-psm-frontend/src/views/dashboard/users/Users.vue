<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { Form, Field } from 'vee-validate'
import { useFocus, useStorage } from '@vueuse/core'
import Heading from '@/components/Heading.vue'
import Table from '@/components/table/Table.vue'
import THeading from '@/components/table/THeading.vue'
import Pagination from '@/components/table/Pagination.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import useAdminUserStore from '@/stores/admin/AdminUserStore'

// Store
const adminUserStore = useAdminUserStore()
const { isLoading, isFinished, isEmpty, hasError, users, usersIds } = storeToRefs(adminUserStore)
const { getUsers, getAllUsersId, createUser, deleteUser, refreshTable, setFinish } = adminUserStore

// Refs
const userId = ref(null)
const searchQuery = ref('')
const showDeleteModal = ref(false)
const showCreateModal = ref(false)
const selectedRows = ref([])
const selectedSortBy = ref('')
const selectedSortDirection = ref('')
const dateStart = ref('')
const dateEnd = ref('')

// Pagination Page (From Local Storage)
const page = useStorage('page')

// Focus Input
const firstInput = ref()
useFocus(firstInput, { initialValue: true })

// Create User
const handleCreateUser = async (values, event) => {
  await createUser(values, event)
  if (isFinished.value) {
    showCreateModal.value = false
    setFinish(false)
  }
}

// Delete User/Modal Handlers
const handleDeleteModal = (id) => {
  userId.value = id
  showDeleteModal.value = true
}
const handleDeleteUser = async () => {
  showDeleteModal.value = false
  await deleteUser(userId.value)
  if (isFinished.value) {
    setFinish(false)
    page.value = 1
    selectedRows.value = []
  }
}

// Search
const handleSearch = async (query) => {
  if (query) {
    page.value = 1
    selectedRows.value = []
  }
  searchQuery.value = query
  await getUsers(
    page.value,
    searchQuery.value,
    selectedSortBy.value,
    selectedSortDirection.value,
    dateStart.value,
    dateEnd.value
  )
}

// Sorting
const handleSorting = async (sortBy, sortDirection) => {
  if (!sortBy || !sortDirection) return

  selectedSortBy.value = sortBy
  selectedSortDirection.value = sortDirection
  await getUsers(
    page.value,
    searchQuery.value,
    selectedSortBy.value,
    selectedSortDirection.value,
    dateStart.value,
    dateEnd.value
  )
}

// Refresh
const handleRefresh = async () => {
  await refreshTable()
}

// Select
const handleCheckSelect = ($event) => {
  const id = Number($event.target.id)
  if ($event.target.checked) {
    if (!selectedRows.value.includes(id)) {
      selectedRows.value.push(id)
    }
  } else {
    const index = selectedRows.value.indexOf(id)
    if (index > -1) {
      selectedRows.value.splice(index, 1)
    }
  }
}

// Select All Checkbox
const handleCheckSelectAll = ($event, users) => {
  if ($event.target.checked) {
    users.forEach(({ id }) => {
      if (!selectedRows.value.includes(id)) {
        selectedRows.value.push(id)
      }
    })
  } else {
    selectedRows.value = []
  }
}

// All Select
const handleSelectAll = async (users) => {
  // If items are not present (In page)
  if (users.meta.total > users.meta.per_page) {
    await getAllUsersId()
    selectedRows.value = usersIds.value
  } else {
    // If items are present (In Page)
    users.data.forEach(({ id }) => {
      if (!selectedRows.value.includes(id)) {
        selectedRows.value.push(id)
      }
    })
  }
}

// All Deselect
const handleDeselectAll = () => {
  if (selectedRows.value.length) {
    selectedRows.value = []
  }
}

// Handle Date Filter
const handleDateFilter = async (date) => {
  dateStart.value = date?.at(0)
  dateEnd.value = date?.at(1)
  await getUsers(
    page.value,
    searchQuery.value,
    selectedSortBy.value,
    selectedSortDirection.value,
    dateStart.value,
    dateEnd.value
  )
}

// Load Users
onMounted(async () => {
  await getUsers(
    page.value,
    searchQuery.value,
    selectedSortBy.value,
    selectedSortDirection.value,
    dateStart.value,
    dateEnd.value
  )
})

// Table columns
const columns = [
  {
    title: 'Name',
    accessorKey: 'name',
    sortable: true
  },
  {
    title: 'Email',
    accessorKey: 'email',
    sortable: true
  },
  {
    title: 'Verified',
    accessorKey: 'email_verified_at',
    sortable: true
  },
  {
    title: 'Role',
    accessorKey: 'role',
    sortable: true
  },
  {
    title: 'Join Date',
    accessorKey: 'created_at',
    sortable: true
  },
  {
    title: 'Action',
    sortable: false
  }
]
</script>

<template>
  <Heading title="Users">
    <Button @click="showCreateModal = true">Add User</Button>
  </Heading>
  <Table
    :loading="isLoading"
    :hasError="hasError"
    :isEmpty="isEmpty"
    :totalColumns="7"
    :data="users"
    :selectedItems="selectedRows"
    @date-range="handleDateFilter"
    @select-all="handleSelectAll"
    @deselect-all="handleDeselectAll"
    @search="handleSearch"
    @refresh="handleRefresh"
  >
    <template #headings>
      <th class="th-cell">
        <label class="select-label">
          <input
            type="checkbox"
            name=""
            class="input-checkbox"
            @input="handleCheckSelectAll($event, users.data)"
            :checked="selectedRows.length >= users.data?.length"
          />
        </label>
      </th>
      <component
        :is="THeading"
        v-for="column in columns"
        :key="column.id"
        :label="column.title"
        :accessorKey="column.accessorKey"
        :sortable="column.sortable"
        @sort="handleSorting"
      />
    </template>
    <template #body>
      <tr v-if="!hasError && !isEmpty" v-for="user in users.data" :key="user.id" class="table-tr">
        <td class="td-cell">
          <label class="select-label">
            <input
              type="checkbox"
              :id="user.id"
              class="input-checkbox"
              @input="handleCheckSelect"
              :checked="selectedRows.includes(user.id)"
            />
          </label>
        </td>
        <td class="td-cell">{{ user.name }}</td>
        <td class="td-cell">{{ user.email }}</td>
        <td class="td-cell">
          <Icon
            v-if="user.is_verified"
            icon="ri:checkbox-circle-fill"
            class="status-icon status-success"
          />
          <Icon
            v-if="!user.is_verified"
            icon="ri:close-circle-fill"
            class="status-icon status-error"
          />
        </td>
        <td class="td-cell">
          <span
            :class="[
              'pill',
              {
                'pill-danger': user.role === 'admin',
                'pill-info': user.role === 'user',
                'pill-warning': user.role === 'editor'
              }
            ]"
          >
            {{ user.role }}
          </span>
        </td>
        <td class="td-cell">{{ user.joined_at }}</td>
        <td class="td-cell">
          <div class="td-cell-action">
            <Button intent="gray">View</Button>
            <Button intent="warning">Suspend</Button>
            <Button intent="primary">Edit</Button>
            <Button ref="deleteBtn" intent="danger" @click="handleDeleteModal(user.id)">
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </template>

    <template #pagination>
      <Pagination :data="users" @page-change="getUsers" />
    </template>
  </Table>

  <!-- Create User Modal -->
  <Modal :show="showCreateModal" @close="showCreateModal = false" label="Create User">
    <Form v-slot="{ isSubmitting, errors }" @submit="handleCreateUser" autocomplete="off">
      <!-- Name -->
      <div class="mb-2">
        <label for="name" class="input-label">Name</label>
        <Field ref="firstInput" name="name" id="name" placeholder="Your Name" class="input" />
        <span v-if="errors.name" class="input-error">
          {{ errors.name }}
        </span>
      </div>
      <!-- Email -->
      <div class="mb-2">
        <label for="email" class="input-label">Email</label>
        <Field name="email" type="email" id="email" placeholder="Your email" class="input" />
        <span v-if="errors.email" class="input-error">
          {{ errors.email }}
        </span>
      </div>
      <!-- Password -->
      <div class="mb-2">
        <label for="password" class="input-label">Password</label>
        <Field
          name="password"
          type="password"
          id="password"
          placeholder="Your password"
          class="input"
        />
        <p v-if="errors.password" class="input-error">
          {{ errors.password }}
        </p>
      </div>
      <!-- Confirm Password -->
      <div class="mb-2">
        <label for="password_confirmation" class="input-label">Confirm Password</label>
        <Field
          name="password_confirmation"
          type="password"
          id="password_confirmation"
          placeholder="Confirm Password"
          class="input"
        />
      </div>
      <!-- Set Role -->
      <div class="mb-4">
        <label for="role" class="input-label">Role</label>
        <Field name="role" as="select" id="role" class="input">
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </Field>
        <span v-if="errors.role" class="input-error">
          {{ errors.role }}
        </span>
      </div>
      <div class="flex gap-3 items-center justify-end">
        <Button intent="primary" type="submit" :loading="isSubmitting">Create</Button>
        <Button intent="light" type="button" @click="showCreateModal = false">Cancel</Button>
      </div>
    </Form>
  </Modal>

  <!-- Delete Modal -->
  <Modal :show="showDeleteModal" @close="showDeleteModal = false" label="Delete User">
    <div class="mb-5">
      <p class="text-xl text-red-400 font-medium">Are your sure you want to delete?</p>
      <p class="text-sm font-medium text-gray-500 mb-5">
        Once deleted, you won't be able to recover the data
      </p>
    </div>
    <div class="flex gap-3 items-center justify-end">
      <Button intent="danger" @click="handleDeleteUser">Delete</Button>
      <Button intent="light" @click="showDeleteModal = false">Cancel</Button>
    </div>
  </Modal>
</template>
