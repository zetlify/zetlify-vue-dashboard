<script setup>
import { onMounted } from 'vue'
import { sidebarState } from '@/composables'
import SidebarHeader from '@/components/sidebar/SidebarHeader.vue'
import SidebarContent from '@/components/sidebar/SidebarContent.vue'

onMounted(() => {
  window.addEventListener('resize', sidebarState.handleWindowResize)
})
</script>

<template>
  <aside
    style="transition-property: width, transform; transition-duration: 150ms"
    :class="[
      'fixed inset-y-0 z-20 py-4 flex flex-col space-y-6 shadow-lg bg-white dark:bg-gray-800 overflow-hidden',
      {
        'translate-x-0 w-64': sidebarState.isOpen || sidebarState.isHovered,
        '-translate-x-full w-64 md:w-16 md:translate-x-0':
          !sidebarState.isOpen && !sidebarState.isHovered
      }
    ]"
    @mouseenter="sidebarState.handleHover(true)"
    @mouseleave="sidebarState.handleHover(false)"
  >
    <SidebarHeader />
    <SidebarContent />
  </aside>
</template>
