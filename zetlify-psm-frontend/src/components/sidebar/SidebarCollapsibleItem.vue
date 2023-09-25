<script setup>
const props = defineProps({
  href: String,
  to: [String, Object],
  title: String,
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <li
    :class="[
      'relative leading-8 m-0 pl-6 whitespace-nowrap',
      'before:block before:w-4 before:h-0 before:absolute before:left-0 before:top-4 before:border-t-2 before:border-t-gray-200 before:-mt-0.5',
      'last:before:bg-white last:before:h-auto last:before:top-4 last:before:bottom-0',
      'dark:last:before:bg-gray-800 dark:before:border-t-gray-600'
    ]"
  >
    <router-link
      v-if="to"
      :to="to"
      v-bind="$attrs"
      :class="[
        'flex w-full font-medium transition-colors',
        {
          'text-gray-800 dark:text-gray-300': active,
          'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400': !active
        }
      ]"
    >
      {{ title }}
    </router-link>
  </li>
</template>
