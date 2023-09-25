<script setup>
import Navigation from '../components/Navigation.vue'
</script>

<template>
  <Navigation />
  <main class="grid min-h-[calc(100vh-44px)] place-items-center py-4 bg-gray-100 dark:bg-gray-900">
    <div class="container sm:max-w-sm">
      <slot />
    </div>
  </main>
</template>
