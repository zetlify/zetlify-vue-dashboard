<script setup>
import { MenuItem } from '@headlessui/vue'
</script>

<template>
  <MenuItem v-slot="{ active, disabled }">
    <router-link
      :class="[
        'dropdown-item',
        {
          'bg-gray-100 dark:bg-gray-800': active,
          'pointer-events-none': disabled
        }
      ]"
    >
      <slot />
    </router-link>
  </MenuItem>
</template>
