<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'

const props = defineProps({
  loading: Boolean,
  as: {
    type: [String, Object],
    default: 'button'
  },
  intent: {
    type: String,
    validator: (val) =>
      ['primary', 'secondary', 'light', 'gray', 'warning', 'danger'].includes(val),
    default: 'secondary'
  },
  size: {
    type: String,
    validator: (val) => ['big', 'small'].includes(val),
    default: 'small'
  }
})

const buttonClasses = computed(() => {
  return cva(
    'inline-flex items-center gap-0.5 py-1.5 shadow-sm font-semibold rounded-lg hover:outline outline-2 outline-offset-2',
    {
      variants: {
        intent: {
          primary: 'bg-primary outline-primary/50 text-white',
          secondary:
            'bg-gray-500 outline-gray-300 text-white dark:text-gray-400 dark:bg-gray-800 dark:outline-gray-700',
          light:
            'bg-gray-200 text-gray-500 outline-gray-300 dark:text-gray-400 dark:bg-gray-900 dark:outline-gray-700',
          gray: 'text-white bg-gray-500 outline-gray-300 dark:bg-gray-700 dark:outline-gray-600',
          warning: 'bg-yellow-500 outline-yellow-500/50 text-white',
          danger: 'bg-red-400 outline-red-300 text-white'
        },
        loading: {
          true: 'cursor-not-allowed opacity-80'
        },
        size: {
          big: 'text-lg px-4',
          small: 'text-base px-3'
        }
      }
    }
  )({
    intent: props.intent,
    loading: props.loading,
    size: props.size
  })
})
</script>
<template>
  <component :is="props.as" :class="buttonClasses" :disabled="props.loading">
    <!-- Loading SVG -->
    <svg
      v-if="props.loading"
      class="animate-spin mr-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </component>
</template>
