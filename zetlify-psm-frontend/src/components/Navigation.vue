<template>
  <nav class="py-2 bg-white dark:bg-gray-800">
    <div class="container flex justify-between items-center">
      <!-- Logo -->
      <h2 class="text-lg font-medium text-gray-500 dark:text-gray-400">Zetlify</h2>

      <!-- Links (If Not isAuthenticated) -->
      <div class="flex gap-3 items-center font-medium text-gray-500 dark:text-gray-400">
        <router-link :to="{ name: 'Register' }" class="hover:text-primary">Register</router-link>
        <router-link :to="{ name: 'Login' }" class="hover:text-primary">Login</router-link>
      </div>
    </div>
  </nav>
</template>
