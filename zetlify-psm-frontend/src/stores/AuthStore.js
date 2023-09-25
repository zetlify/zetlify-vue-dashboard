import { defineStore } from 'pinia'
import { inject } from 'vue'
import { isEmpty } from 'lodash'
import { createMongoAbility, AbilityBuilder } from '@casl/ability'
import { ABILITY_TOKEN } from '@casl/vue'
import axios from 'axios'

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    hasAuth: false,
    ability: inject(ABILITY_TOKEN)
  }),
  getters: {
    isAuthenticated() {
      return this.hasAuth && !isEmpty(this.user) ? true : false
    },
    authUser() {
      return this.user
    }
  },
  actions: {
    // Unset Auth
    unsetAuth() {
      this.hasAuth = false
      this.user = null
      this.ability.update([])
    },

    // Set Auth User Abilities
    async setAbilities(abilities) {
      const { can, rules } = new AbilityBuilder(createMongoAbility)
      can(abilities)
      this.ability = this.ability.update(rules)
    },

    // Get/Set CSRF Token
    async getCSRFToken() {
      await axios.create({ baseURL: import.meta.env.VITE_SERVER_URL }).get('/sanctum/csrf-cookie')
    },

    // Check Auth User and Get Info
    async checkAuthUser() {
      try {
        // Auth Status
        const { data: authStatus } = await axios.get('/auth-check')

        // If Authenticated Fetch User & Set Abilities
        if (authStatus) {
          const { data } = await axios.get('/user')
          this.setAbilities(data.permissions)
          this.user = data
        }

        this.hasAuth = authStatus
        return authStatus
      } catch (error) {
        // Error Page/Toast
        console.log(error)
      }
    },

    // Register
    async register(values, { setErrors }) {},

    // Login
    async login(values, { setErrors, setFieldError }) {
      try {
        await this.getCSRFToken()
        await axios.post('/login', values)
        await this.checkAuthUser()
        await this.router.push({ name: 'Dashboard' })
      } catch (error) {
        if (error.response.data.errors) setErrors(error.response.data.errors)
        else {
          setFieldError('email', error.response.data.message)
        }
      }
    },

    // Logout
    async logout() {
      try {
        this.router.push({ name: 'Login' }).then(() => {
          this.unsetAuth()
        })
        await axios.post('/logout')
      } catch (error) {
        // Error Page/Toast
        console.log(error)
      }
    }
  }
})

export default useAuthStore
