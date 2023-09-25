<script setup>
import { sidebarState } from '@/composables'

const props = defineProps({
  to: {
    type: [String, Object],
    required: false
  },
  active: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <router-link
    v-if="to"
    :to="to"
    :class="[
      'p-2 flex items-center gap-2 rounded-md transition-colors',
      {
        'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900': !active,
        'text-white bg-primary shadow hover:bg-primary-deep': active
      }
    ]"
  >
    <slot name="icon" />

    <span
      class="text-base font-medium whitespace-nowrap"
      v-show="sidebarState.isOpen || sidebarState.isHovered"
    >
      {{ title }}
    </span>
  </router-link>
  <button
    v-else
    type="button"
    :class="[
      'p-2 w-full flex items-center gap-2 rounded-md transition-colors',
      {
        'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900': !active,
        'text-white bg-primary shadow hover:bg-primary-deep': active
      }
    ]"
  >
    <slot name="icon" />

    <span
      class="text-base font-medium whitespace-nowrap"
      v-show="sidebarState.isOpen || sidebarState.isHovered"
    >
      {{ title }}
    </span>
    <slot name="arrow" />
  </button>
</template>
