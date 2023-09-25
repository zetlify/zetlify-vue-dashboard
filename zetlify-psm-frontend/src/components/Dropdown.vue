<script setup>
import { computed } from 'vue'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { cva } from 'class-variance-authority'

const props = defineProps({
  align: {
    type: String,
    validator: (val) => ['right', 'left', 'top'].includes(val),
    default: 'right'
  }
})

const dropdownClasses = computed(() => {
  return cva(
    'absolute w-48 py-1 mt-2 -mb-0.5 rounded-md shadow-lg ring-1 ring-gray-200 z-40 bg-white dark:ring-gray-700 dark:bg-gray-800',
    {
      variants: {
        align: {
          right: 'origin-top-right right-0',
          left: 'origin-top-left left-0',
          top: 'origin-top-center bottom-full left-1/2 transform -translate-x-1/2'
        }
      }
    }
  )({
    align: props.align
  })
})
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton as="div">
      <slot name="trigger" />
    </MenuButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems :class="dropdownClasses">
        <slot name="content" />
      </MenuItems>
    </transition>
  </Menu>
</template>
