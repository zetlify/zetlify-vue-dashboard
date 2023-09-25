<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import Button from '@/components/Button.vue'
import useAuthStore from '@/stores/AuthStore'
import { Form, Field } from 'vee-validate'

// Auth Store
const authStore = useAuthStore()
const { login } = authStore
</script>

<template>
  <AuthLayout>
    <!-- Heading -->
    <div class="mb-5 text-center">
      <h1 class="text-3xl font-medium text-gray-700 dark:text-gray-300 mb-1">Account Login</h1>
      <div class="flex justify-center gap-1">
        <span class="font-medium text-gray-600 dark:text-gray-400">Do not have an account?</span>
        <router-link :to="{ name: 'Register' }" class="font-medium text-primary">
          Register
        </router-link>
      </div>
    </div>

    <Form
      v-slot="{ isSubmitting, errors }"
      @submit="login"
      class="px-6 py-6 shadow-md rounded-lg bg-white dark:bg-gray-800"
    >
      <!-- Email -->
      <div class="mb-2">
        <label for="email" class="input-label">Email</label>
        <Field name="email" type="email" id="email" placeholder="Your email" class="input" />
        <span v-if="errors.email" class="input-error">
          {{ errors.email }}
        </span>
      </div>
      <!-- Password -->
      <div class="mb-4">
        <label for="password" class="input-label">Password</label>
        <Field
          name="password"
          type="password"
          id="password"
          placeholder="Your password"
          class="input"
        />
        <span v-if="errors.password" class="input-error">{{ errors.password }}</span>
      </div>
      <!-- Remember & Forgot Password -->
      <div class="flex justify-between gap-1 mb-4">
        <div class="flex items-center gap-2 leading-0">
          <Field
            name="remember"
            :value="true"
            :unchecked-value="false"
            type="checkbox"
            id="remember"
            class="input-checkbox"
          />
          <label for="remember" class="font-medium text-gray-500 dark:text-gray-400">
            Remember Me
          </label>
        </div>
        <router-link :to="{ name: 'Register' }" class="font-medium text-primary">
          Forgot password?
        </router-link>
      </div>
      <Button intent="primary" size="big" :loading="isSubmitting">Login</Button>
    </Form>
  </AuthLayout>
</template>
