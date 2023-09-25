<script setup>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarState } from '@/composables'
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar />
    <div
      style="transition-property: margin; transition-duration: 150ms"
      :class="[
        'min-h-screen flex flex-col',
        {
          'lg:ml-64': sidebarState.isOpen,
          'md:ml-16': !sidebarState.isOpen
        }
      ]"
    >
      <!-- Navbar -->
      <Navbar />

      <!-- Main View -->
      <main class="p-6 h-[calc(100vh-56px)] overflow-y-auto custom-scroll">
        <router-view />
      </main>
    </div>
  </div>
</template>
