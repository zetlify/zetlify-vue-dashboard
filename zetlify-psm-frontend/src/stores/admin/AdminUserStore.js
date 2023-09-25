import { defineStore } from 'pinia'
import axios from 'axios'

const useAdminUserStore = defineStore('adminUsers', {
  state: () => ({
    isLoading: false,
    isFinished: false,
    isEmpty: false,
    hasError: false,
    users: [],
    usersIds: []
  }),

  actions: {
    // Set API Error (If Any)
    setError() {
      this.isLoading = false
      this.hasError = true
    },

    // Set API States
    setState(users) {
      this.users = users
      this.isEmpty = !users.data.length ?? true
      this.hasError = this.hasError && false
      this.isLoading = false
    },

    // Track if API processing is finished
    setFinish(bool) {
      this.isFinished = bool
    },

    // Get All Users
    async getUsers(
      page = 1,
      searchQuery = '',
      sortBy = 'created_at',
      sortDirection = 'desc',
      dateStart = '',
      dateEnd = ''
    ) {
      try {
        this.isLoading = true
        const { data: users } = await axios.get(
          `/admin/users?page=${page}&search=${searchQuery}&sort=${sortBy}&direction=${sortDirection}&dateStart=${dateStart}&dateEnd=${dateEnd}`
        )
        this.setState(users)
      } catch (error) {
        this.setError()
      }
    },

    // Create User
    async createUser(values, { setErrors }) {
      try {
        await axios.post(`/admin/users`, values)
        await this.getUsers()
        this.setFinish(true)
      } catch (error) {
        if (error.response.data.errors) setErrors(error.response.data.errors)
        else {
          setErrors(error.response.data.message)
        }
      }
    },

    // Get Single User
    async getUser(userId) {
      try {
        this.isLoading = true
        await axios.get(`/admin/users/${userId}`)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },

    // Get All Users Id (For Bulk Actions)
    async getAllUsersId() {
      try {
        this.isLoading = true
        const { data } = await axios.get(`/admin/users/all/ids`)
        this.usersIds = data
        this.isLoading = false
        this.hasError = this.hasError && false
      } catch (error) {
        this.setError()
      }
    },

    // Delete User
    async deleteUser(userId) {
      try {
        this.isLoading = true
        await axios.delete(`/admin/users/${userId}`)

        await this.getUsers()
        this.setFinish(true)
      } catch (error) {
        this.isLoading = false
      }
    },

    // Delete Multiple Users
    async deleteMultipleUsers(ids) {
      try {
        this.isLoading = true
        await axios.delete(`/admin/users/delete-multiple`, { ids })

        await this.getUsers()
        this.setFinish(true)
      } catch (error) {
        this.isLoading = false
      }
    },

    // Refresh Users Table
    async refreshTable() {
      await this.getUsers()
    }
  }
})

export default useAdminUserStore
