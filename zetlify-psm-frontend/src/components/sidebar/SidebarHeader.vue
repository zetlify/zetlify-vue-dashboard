<script setup>
import { Icon } from '@iconify/vue'
import { sidebarState } from '@/composables'
</script>

<template>
  <div class="flex items-center justify-between px-3">
    <router-link :to="{ name: 'Dashboard' }" class="inline-flex items-center gap-2">
      <span class="sr-only">Zaryftech</span>
      <img src="/zaryftech.svg" class="w-10 h-auto" alt="" />
    </router-link>

    <button
      class="btn-icon"
      v-show="sidebarState.isOpen || sidebarState.isHovered"
      @click="sidebarState.isOpen = !sidebarState.isOpen"
    >
      <!-- Menu Fold Left Icon -->
      <div v-show="sidebarState.isOpen">
        <Icon icon="ri:menu-fold-line" class="icon hidden lg:block" />
      </div>

      <!-- Menu Fold Right Icon -->
      <div v-show="!sidebarState.isOpen">
        <Icon icon="ri:menu-unfold-line" class="icon hidden lg:block" />
      </div>

      <!-- Mobile Sidebar Close Icon -->
      <Icon icon="ri:close-line" class="icon lg:hidden" />
    </button>
  </div>
</template>
