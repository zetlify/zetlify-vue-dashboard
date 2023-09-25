<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    required: false
  }
})
</script>

<template>
  <div
    class="relative text-gray-500 bg-white shadow-sm rounded-lg p-5 dark:text-gray-400 dark:bg-gray-800"
  >
    <!-- Card Loading Overlay -->
    <div v-if="props.loading" class="card-loader">
      <svg
        class="animate-spin w-8 h-8 text-primary"
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
    </div>
    <slot />
  </div>
</template>

<style scoped>
.card-loader {
  @apply absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg grid place-items-center z-10 dark:bg-black/10;
}
</style>
