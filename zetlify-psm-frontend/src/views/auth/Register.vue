<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import Button from '@/components/Button.vue'
import useAuthStore from '@/stores/AuthStore'
import { Form, Field } from 'vee-validate'

// Auth Store
const authStore = useAuthStore()
const { register } = authStore
</script>

<template>
  <AuthLayout>
    <!-- Heading -->
    <div class="mb-5 text-center">
      <h1 class="text-3xl font-medium text-gray-700 dark:text-gray-300 mb-1">Create Account</h1>
      <div class="flex justify-center gap-1">
        <span class="font-medium text-gray-600 dark:text-gray-400">Already have an account?</span>
        <router-link :to="{ name: 'Login' }" class="font-medium text-primary">Login</router-link>
      </div>
    </div>

    <Form
      v-slot="{ isSubmitting, errors }"
      @submit="register"
      class="px-6 py-6 shadow-md rounded-lg bg-white dark:bg-gray-800"
      autocomplete="off"
    >
      <!-- Name -->
      <div class="mb-2">
        <label for="name" class="input-label">Name</label>
        <Field name="name" id="name" placeholder="Your Name" class="input" />
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
        <span v-if="errors.password" class="input-error">
          {{ errors.password }}
        </span>
      </div>
      <!-- Confirm Password -->
      <div class="mb-4">
        <label for="password_confirmation" class="input-label">Confirm Password</label>
        <Field
          name="password_confirmation"
          type="password"
          id="password_confirmation"
          placeholder="Confirm Password"
          class="input"
        />
      </div>

      <!-- Accept Terms -->
      <div class="flex items-center gap-2 leading-0 mb-4">
        <input
          name="agree"
          type="checkbox"
          :value="true"
          :unchecked-value="false"
          id="agree"
          class="input-checkbox"
        />
        <label for="agree" class="font-medium text-gray-500 dark:text-gray-400">
          I agree to the
          <router-link :to="{ name: 'Login' }" class="text-primary">
            Terms and conditions
          </router-link>
        </label>
      </div>

      <!-- Register Button -->
      <Button intent="primary" size="big" :loading="isSubmitting">Register</Button>
    </Form>
  </AuthLayout>
</template>
