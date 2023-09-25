<script setup>
import Heading from '@/components/Heading.vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useRolePermissionsStore from '@/stores/admin/RolePermissionsStore'

const rolePermissionsStore = useRolePermissionsStore()
const { isLoading, roles, permissions, rolePermissions } = storeToRefs(rolePermissionsStore)
const { getRolesAndPermissions, getRolePermissions, updateRolePermissions } = rolePermissionsStore

const currentRole = ref('user')
const currentPermissions = ref([])

// Get Permissions for different role
const handleRoleChange = async ($event) => {
  currentRole.value = $event.target.value
  await getRolePermissions(currentRole.value)
  currentPermissions.value = rolePermissions.value.permissions
}

// Update Permissions for role
const handleRolePermissionsUpdate = async () => {
  await updateRolePermissions(currentRole.value, currentPermissions.value)
}

// Detect permission changes & update
const handleRolePermissionsChange = ($event, value) => {
  if ($event.target.checked) {
    if (!currentPermissions.value.includes($event.target.value)) {
      currentPermissions.value.push($event.target.value)
    }
  } else {
    const filteredValues = currentPermissions.value.filter((item) => item !== value)
    currentPermissions.value = filteredValues
  }
}

onMounted(async () => {
  await getRolePermissions(currentRole.value)
  await getRolesAndPermissions()
  currentPermissions.value = rolePermissions.value.permissions
})
</script>

<template>
  <Heading title="Role Permissions" />
  <Card :loading="isLoading">
    <div>
      <!-- Roles -->
      <div class="mb-8">
        <label for="roles" class="input-label">Roles</label>
        <select name="role" id="roles" class="input" @input="handleRoleChange">
          <option v-for="role in roles" :selected="rolePermissions.role === role">
            {{ role }}
          </option>
        </select>
      </div>

      <!-- Permissions -->
      <form @submit.prevent="handleRolePermissionsUpdate" class="grid grid-cols-1 gap-6">
        <!-- User Access -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-400">Users Access</h3>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="permission in permissions.user_access"
              :key="permission.id"
              class="flex items-center gap-2 leading-0"
            >
              <input
                :v-model="permission.name"
                :id="permission.name"
                :checked="rolePermissions.permissions.includes(permission.name)"
                :value="permission.name"
                @input="handleRolePermissionsChange($event, permission.name)"
                type="checkbox"
                class="input-checkbox"
              />
              <label
                :for="permission.name"
                class="font-medium text-gray-500 dark:text-gray-400 select-none"
              >
                {{ permission.name }}
              </label>
            </div>
          </div>
        </div>

        <!-- Editor Access -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-400">Editor Access</h3>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="permission in permissions.editor_access"
              :key="permission.id"
              class="flex items-center gap-2 leading-0"
            >
              <input
                :v-model="permission.name"
                :id="permission.name"
                :checked="rolePermissions.permissions.includes(permission.name)"
                :value="permission.name"
                @input="handleRolePermissionsChange($event, permission.name)"
                type="checkbox"
                class="input-checkbox"
              />
              <label
                :for="permission.name"
                class="font-medium text-gray-500 dark:text-gray-400 select-none"
              >
                {{ permission.name }}
              </label>
            </div>
          </div>
        </div>

        <!-- Product Access -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-400">Product Access</h3>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="permission in permissions.product_access"
              :key="permission.id"
              class="flex items-center gap-2 leading-0"
            >
              <input
                :v-model="permission.name"
                :id="permission.name"
                :checked="rolePermissions.permissions.includes(permission.name)"
                :value="permission.name"
                @input="handleRolePermissionsChange($event, permission.name)"
                type="checkbox"
                class="input-checkbox"
              />
              <label
                :for="permission.name"
                class="font-medium text-gray-500 dark:text-gray-400 select-none"
              >
                {{ permission.name }}
              </label>
            </div>
          </div>
        </div>
        <div>
          <Button intent="gray">Update</Button>
        </div>
      </form>
    </div>
  </Card>
</template>
