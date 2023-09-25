<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  accessorKey: String,
  sortable: {
    type: Boolean,
    default: true
  }
})

// Sorting
const count = ref(0)
const sorting = ref({
  sortBy: 'created_at',
  sortDirection: 'asc'
})

const emit = defineEmits(['sort'])

// Sorting columns (3 States - asc, desc, normal)
const handleSortingColumn = () => {
  if (!props.accessorKey) return

  let sortBy = sorting.value.sortBy
  let sortDirection = sorting.value.sortDirection
  count.value++

  if (count.value === 1) {
    sortBy = props.accessorKey
    emit('sort', sortBy, sortDirection)
  } else if (count.value === 2) {
    sortBy = props.accessorKey
    sortDirection = 'desc'
    emit('sort', sortBy, sortDirection)
  } else {
    count.value = 0
    sortBy = 'created_at'
    sortDirection = 'desc'
    emit('sort', sortBy, sortDirection)
  }
}
</script>

<template>
  <th
    class="th-cell"
    :class="{
      'cursor-pointer select-none': props.sortable
    }"
    @click="$emit('sort')"
  >
    <div class="flex gap-1 items-center justify-between" @click="handleSortingColumn">
      <span>{{ props.label }}</span>
      <div v-if="props.sortable">
        <Icon
          v-if="count === 0"
          icon="ri:expand-up-down-fill"
          class="w-[18px] h-[18px] flex-shrink-0 text-gray-500/60 dark:text-gray-400/50"
        />
        <span v-if="count === 1">></span>
        <span v-if="count === 2">&lt;</span>
      </div>
    </div>
  </th>
</template>
