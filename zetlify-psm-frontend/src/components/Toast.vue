<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { Icon } from '@iconify/vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: 'Something went wrong'
  },
  type: {
    type: String,
    validator: (val) => ['info', 'error', 'success'].includes(val),
    default: 'error'
  }
})

// Variation
const toastContent = computed(() => {
  return cva('flex flex-1 items-center gap-2', {
    variants: {
      type: {
        info: 'text-primary',
        success: 'text-green-500',
        error: 'text-red-400'
      }
    }
  })({
    type: props.type
  })
})

// Icon Type
const iconType = computed(() => {
  const icons = {
    info: 'ri:information-fill',
    success: 'ri:checkbox-circle-fill',
    error: 'ri:error-warning-fill'
  }
  return icons[props.type]
})
</script>

<template>
  <div class="toast-container">
    <div :class="toastContent">
      <Icon :icon="iconType" class="toast-icon" />
      <p class="toast-message">{{ props.message }}</p>
    </div>
    <button class="btn-icon toast-close" @click="$emit('remove')">
      <Icon icon="ri:close-line" class="icon" />
    </button>
  </div>
</template>

<style scoped>
.toast-container {
  @apply absolute w-fit flex gap-3 items-center px-4 py-2 pr-3 rounded-lg bg-white shadow-md dark:bg-gray-800;
}
.toast-icon {
  @apply w-8 h-8 flex-shrink-0;
}
.toast-message {
  @apply flex-1 text-base max-w-[270px] truncate font-semibold;
}
.toast-close {
  @apply flex-shrink-0;
}
</style>
