<script setup>
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { sidebarState } from '@/composables'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Dropdown align="top">
    <template #trigger>
      <button
        class="w-full flex items-center justify-between gap-2 py-2 px-3 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-3">
          <Icon icon="heroicons:home" class="default-icon" />
          <!-- <img
            src="https://i.pravatar.cc/64?img=12"
            class="object-fit w-10 h-10 rounded-md"
            alt=""
          /> -->
          <span
            class="w-[150px] text-base font-medium text-gray-500 text-left dark:text-gray-400 whitespace-nowrap truncate"
            v-show="sidebarState.isOpen || sidebarState.isHovered"
          >
            Computer Shop
          </span>
        </div>
        <Icon
          icon="heroicons:chevron-up-down"
          class="icon"
          v-show="sidebarState.isOpen || sidebarState.isHovered"
        />
      </button>
    </template>
    <template #content>
      <DropdownItem :to="{ name: 'Dashboard' }">
        <Icon icon="fluent:home-add-24-regular" class="icon" />
        <span>Add New Shop</span>
      </DropdownItem>
      <DropdownItem :to="{ name: 'Dashboard' }">
        <Icon icon="carbon:settings-check" class="icon" />
        <span>Shop Settings</span>
      </DropdownItem>
      <hr class="border-1 border-gray-200 dark:border-gray-700" />
      <DropdownItem :to="{ name: 'Dashboard' }">
        <Icon icon="heroicons:home" class="icon" />
        <span>Other Shop</span>
      </DropdownItem>
    </template>
  </Dropdown>
</template>
