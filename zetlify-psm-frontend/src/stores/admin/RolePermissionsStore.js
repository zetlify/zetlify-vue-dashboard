import { defineStore } from 'pinia'
import axios from 'axios'

const useRolePermissionsStore = defineStore('rolePermissions', {
  state: () => ({
    isLoading: false,
    roles: [],
    permissions: [],
    rolePermissions: []
  }),
  actions: {
    // Get all roles & permissions
    async getRolesAndPermissions() {
      try {
        this.isLoading = true
        const { data } = await axios.get('/admin/roles-permissions')
        this.roles = data.roles
        this.permissions = data.permissions
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    },

    // Get single role with permissions
    async getRolePermissions(role = 'user') {
      try {
        this.isLoading = true
        const { data } = await axios.get(`/admin/role-permissions?role=${role}`)
        this.rolePermissions = data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    },

    // Update role permissions
    async updateRolePermissions(role, permissions) {
      try {
        this.isLoading = true
        await axios.put('/admin/role-permissions', { role, permissions })
        await this.getRolePermissions(role)
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }
  }
})

export default useRolePermissionsStore
