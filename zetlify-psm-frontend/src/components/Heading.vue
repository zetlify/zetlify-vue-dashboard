<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-semibold text-gray-500 dark:text-gray-400">
      {{ props.title }}
    </h1>
    <slot />
  </div>
</template>
