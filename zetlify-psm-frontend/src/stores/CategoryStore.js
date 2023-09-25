import { defineStore } from 'pinia'
import axios from 'axios'

const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: []
  }),
  actions: {
    async create() {},
    async getCategories() {},
    async getCategory() {},
    async editCategory() {},
    async deleteCategory() {}
  }
})

export default useCategoryStore
