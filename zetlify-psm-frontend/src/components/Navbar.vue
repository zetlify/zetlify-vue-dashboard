<script setup>
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import useAuthStore from '@/stores/AuthStore'
import { Icon } from '@iconify/vue'
import { useFullscreen } from '@vueuse/core'
import { isDark, toggleDarkMode, sidebarState } from '@/composables'
import { storeToRefs } from 'pinia'

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

const authStore = useAuthStore()
const { isAuthenticated, authUser } = storeToRefs(authStore)

// Logout
const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <nav
    class="sticky top-0 z-10 pl-4 pr-6 py-2 flex items-center justify-between lg:justify-end shadow-sm bg-white dark:bg-gray-800"
  >
    <!-- Sidebar Close Button -->
    <button
      class="w-10 h-10 flex flex-col flex-shrink-0 justify-around p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 lg:hidden"
      @click="sidebarState.isOpen = !sidebarState.isOpen"
    >
      <span class="block w-full h-[2px] bg-gray-500 dark:bg-gray-400"></span>
      <span class="block w-full h-[2px] bg-gray-500 dark:bg-gray-400"></span>
      <span class="block w-full h-[2px] bg-gray-500 dark:bg-gray-400"></span>
    </button>

    <div class="flex items-center gap-1">
      <!-- Dark Mode Toggle -->
      <button @click="toggleDarkMode()" class="btn-icon hidden lg:block">
        <Icon icon="heroicons:moon" v-show="!isDark" class="icon" />
        <Icon icon="heroicons:sun" v-show="isDark" class="icon" />
      </button>

      <!-- Full Screen Toggle -->
      <button @click="toggleFullScreen" class="btn-icon hidden lg:block">
        <Icon icon="heroicons:arrows-pointing-out" v-show="!isFullscreen" class="icon" />
        <Icon icon="heroicons:arrows-pointing-in" v-show="isFullscreen" class="icon" />
      </button>

      <!-- Profile Dropdown -->
      <Dropdown>
        <template #trigger>
          <button class="max-w-[150px] flex gap-3 items-center pl-2">
            <span
              v-if="isAuthenticated"
              class="text-base font-medium text-gray-500 dark:text-gray-400 truncate"
            >
              {{ authUser.name }}
            </span>
            <Icon icon="la:user" class="default-icon" />
            <!-- <img
              src="https://i.pravatar.cc/64?img=12"
              class="object-fit w-9 h-9 rounded-md"
              alt=""
            /> -->
          </button>
        </template>
        <template #content>
          <DropdownItem to="#">
            <Icon icon="heroicons:user-circle" class="icon" />
            <span>Profile</span>
          </DropdownItem>
          <button
            @click="toggleDarkMode()"
            class="dropdown-item cursor-pointer select-none lg:hidden"
          >
            <Icon icon="heroicons:moon" v-show="!isDark" class="icon" />
            <Icon icon="heroicons:sun" v-show="isDark" class="icon" />
            <span>Dark Mode</span>
          </button>
          <button type="submit" class="dropdown-item" @click="handleLogout">
            <Icon icon="heroicons:arrow-left-on-rectangle" class="icon" />
            <span>Log Out</span>
          </button>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>
