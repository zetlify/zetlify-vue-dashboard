import { defineStore } from 'pinia'
import axios from 'axios'

const useProductStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async create() {},
    async getProducts() {},
    async getProduct() {},
    async editProduct() {},
    async deleteProduct() {}
  }
})

export default useProductStore
