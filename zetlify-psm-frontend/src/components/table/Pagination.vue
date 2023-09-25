<script setup>
import { Icon } from '@iconify/vue'
import { Form, Field, defineRule } from 'vee-validate'
import { required, between } from '@vee-validate/rules'
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

const props = defineProps({
  data: Object
})

const currentPage = useStorage('page', 1)
const pageInputError = ref(false)

// First Page Handler
const handleFirstPage = () => {
  if (!props.data.links.prev) return
  currentPage.value = 1
  emit('page-change', currentPage.value)
}
// Prev Page Handler
const handlePrevPage = () => {
  if (!props.data.links.prev) return
  currentPage.value--
  emit('page-change', currentPage.value)
}

// Next Page Handler
const handleNextPage = () => {
  if (!props.data.links.next) return
  currentPage.value++
  emit('page-change', currentPage.value)
}
// Last Page Handler
const handleLastPage = () => {
  if (!props.data.links.next) return
  currentPage.value = props.data.meta.last_page
  emit('page-change', currentPage.value)
}

const emit = defineEmits(['page-change', 'page-input'])

// Go To Page Input (Rules & Submission)
defineRule('between', between)
defineRule('required', required)

// Invalid Page Input
const handleInvalidPageInput = () => (pageInputError.value = true)

// Page Input Process & Check
const handlePageInput = ({ page }, { setFieldValue }) => {
  if (page < 1 || page > props.data.meta.last_page) return
  pageInputError.value = pageInputError.value && false
  if (page === props.data.meta.current_page) return
  currentPage.value = page
  emit('page-change', currentPage.value)
  setFieldValue('page', currentPage.value)
}

// Watch if page is set (Local storage)
watch(
  () => currentPage.value,
  (newValue) => {
    if (isNaN(newValue)) {
      currentPage.value = 1
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex gap-2 items-center">
    <!-- First -->
    <button
      title="First page"
      @click="handleFirstPage"
      class="btn-circle disabled:cursor-not-allowed"
      :disabled="!props.data.links?.prev"
    >
      <Icon icon="mdi:chevron-double-left" class="icon" />
    </button>
    <!-- Prev -->
    <button
      title="Previous page"
      @click="handlePrevPage"
      class="btn-circle disabled:cursor-not-allowed"
      :disabled="!props.data.links?.prev"
    >
      <Icon icon="mdi:chevron-left" class="icon" />
    </button>

    <!-- Current Page & Go to -->
    <Form @submit="handlePageInput" @invalidSubmit="handleInvalidPageInput">
      <Field
        type="number"
        name="page"
        :placeholder="currentPage"
        :modelValue="currentPage"
        :rules="{ required: true, between: [1, props.data.meta?.last_page] }"
        :class="[
          'paginate-input',
          {
            'paginate-input-error': pageInputError
          }
        ]"
      />
    </Form>

    <!-- Next -->
    <button
      title="Next page"
      @click="handleNextPage"
      class="btn-circle disabled:cursor-not-allowed"
      :disabled="!props.data.links?.next"
    >
      <Icon icon="mdi:chevron-right" class="icon" />
    </button>
    <!-- Last -->
    <button
      title="Last page"
      @click="handleLastPage"
      class="btn-circle disabled:cursor-not-allowed"
      :disabled="!props.data.links?.next"
    >
      <Icon icon="mdi:chevron-double-right" class="icon" />
    </button>
  </div>
</template>

<style scoped>
.paginate-input {
  @apply w-16 h-8 appearance-none text-base font-semibold text-gray-500 text-center focus:outline-none border-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-primary shadow rounded-lg px-2 py-1 placeholder-gray-500/60 dark:text-gray-400 dark:ring-gray-700 dark:focus:ring-primary dark:bg-gray-900;
}
.paginate-input-error {
  @apply ring-red-400 focus:ring-red-500 dark:ring-red-400 dark:focus:ring-red-500;
}
</style>
