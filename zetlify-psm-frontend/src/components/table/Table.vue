<script setup>
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import DatePicker from '@vuepic/vue-datepicker'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { Icon } from '@iconify/vue'
import { Field } from 'vee-validate'
import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  loading: Boolean,
  hasError: Boolean,
  isEmpty: Boolean,
  totalColumns: Number,
  data: Object,
  selectedItems: Array
})

// Date
const date = ref()

// Preset Date
const presetDates = ref([
  { label: 'Today', value: [new Date(), new Date()] },
  {
    label: 'Today (Slot)',
    value: [new Date(), new Date()],
    slot: 'preset-date-range-button'
  },
  { label: 'This month', value: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))]
  },
  { label: 'This year', value: [startOfYear(new Date()), endOfYear(new Date())] }
])

// Multiple Delete Modal
const showMultipleDeleteModal = ref(false)

const emit = defineEmits(['search', 'date-range', 'refresh', 'select-all', 'deselect-all'])

// Handle Date
const handleDateInput = (values) => {
  if (!values?.length || values.includes(null)) {
    return
  }

  emit('date-range', values)
}

// Handle Search Input
const handleSearchInput = useDebounceFn(($event) => {
  emit('search', $event.target.value)
}, 1000)

// Handle Select All Data
const handleSelectAllData = () => {
  emit('select-all', props.data)
}

// Handle Bulk Delete
const handleBulkDelete = () => {}
</script>

<template>
  <div class="table-container">
    <!-- Loading Overlay -->
    <div v-if="props.loading" class="table-loader">
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

    <!-- Header -->
    <div class="table-header">
      <div class="flex gap-3">
        <!-- Search & Refresh -->
        <Field
          type="search"
          name="search"
          @input="handleSearchInput"
          placeholder="Search..."
          class="input"
        />
        <!-- Refresh -->
        <Button intent="light" class="space-x-1" @click="$emit('refresh')">
          <Icon icon="tabler:refresh" class="icon" />
          <span>Refresh</span>
        </Button>
      </div>
      <!-- Date & Custom Filter -->
      <div class="flex gap-3">
        <DatePicker
          v-model="date"
          :model-value="date"
          range
          :preset-dates="presetDates"
          :enable-time-picker="false"
          @update:model-value="handleDateInput"
          placeholder="Select Date"
          @input="handleDateInput"
        />
        <select class="input !w-[300px]">
          <option value="">Verified Users</option>
          <option value="">Users</option>
          <option value="">Editors</option>
        </select>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div v-if="selectedItems.length" class="flex gap-4 items-center mb-4">
      <p class="text-gray-600 font-medium dark:text-gray-300/70">
        <b>{{ selectedItems.length }}</b> records selected
      </p>
      <button
        v-if="selectedItems.length < props.data.meta?.total"
        class="text-red-400 font-medium hover:underline"
        @click="handleSelectAllData"
      >
        Select all <b>{{ props.data.meta?.total }}</b>
      </button>
      <button class="text-primary font-medium hover:underline" @click="$emit('deselect-all')">
        Deselect all
      </button>
      <Button intent="light">Bulk Actions</Button>
    </div>

    <OverlayScrollbarsComponent
      :class="{
        'max-h-[calc(100vh-300px)]': !selectedItems.length,
        'max-h-[calc(100vh-352px)]': selectedItems.length
      }"
    >
      <table class="w-full text-left">
        <thead class="sticky top-0 left-0">
          <tr
            class="divide-x divide-gray-300 dark:text-gray-300 dark:divide-gray-700 bg-gray-200 dark:bg-gray-900"
          >
            <slot name="headings" />
          </tr>
        </thead>
        <tbody class="dark:text-gray-300">
          <!-- If Empty Or Error -->
          <td v-if="props.hasError || props.isEmpty" :colspan="props.totalColumns">
            <div
              class="flex items-center justify-center text-gray-500 dark:text-gray-300/70 text-lg pt-6 pb-3 font-medium"
            >
              <div v-if="props.hasError" class="flex items-center gap-1.5">
                <Icon icon="mdi:warning-circle-outline" class="w-8 h-8" />
                <p>Something went wrong!</p>
              </div>
              <div v-if="!props.hasError && props.isEmpty" class="flex items-center gap-1.5">
                <Icon icon="tabler:database-x" class="w-8 h-8" />
                <p>No data found!</p>
              </div>
            </div>
          </td>

          <slot name="body" />
        </tbody>
      </table>
    </OverlayScrollbarsComponent>
    <div v-if="!props.hasError && !props.isEmpty" class="table-footer">
      <div class="table-footer-info">
        <p class="text-gray-600 font-medium dark:text-gray-400">
          Total Records: <b>{{ props.data.meta?.total }}</b>
        </p>
        <p class="text-gray-600 font-medium dark:text-gray-400">
          Pages: <b>{{ props.data.meta?.current_page }}/{{ props.data.meta?.last_page }}</b>
        </p>
      </div>
      <!-- Pagination -->
      <slot name="pagination" />
    </div>
  </div>

  <!-- Bulk Delete Modal -->
  <Modal
    :show="showMultipleDeleteModal"
    @close="showMultipleDeleteModal = false"
    label="Delete Selected Users?"
  >
    <div class="mb-5">
      <p class="text-xl text-red-400 font-medium">Are your sure you want to delete?</p>
      <p class="text-sm font-medium text-gray-500 mb-5">
        Once deleted, you won't be able to recover the data
      </p>
    </div>
    <div class="flex gap-3 items-center justify-end">
      <Button intent="danger" @click="handleBulkDelete">Delete</Button>
      <Button intent="light" @click="showMultipleDeleteModal = false">Cancel</Button>
    </div>
  </Modal>
</template>

<style scoped>
.table-container {
  @apply bg-white rounded-lg shadow-sm p-4 relative dark:bg-gray-800 z-0;
}
.table-loader {
  @apply absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg grid place-items-center z-10 dark:bg-black/10;
}
.table-header {
  @apply flex justify-between items-center mb-4;
}
.table-footer {
  @apply flex justify-between items-center gap-4 mt-4 px-3;
}
.table-footer-info {
  @apply flex gap-4;
}
</style>
