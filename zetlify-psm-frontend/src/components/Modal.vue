<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Button from './Button.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  label: String
})

const modal = ref()
const emit = defineEmits(['close'])
onClickOutside(modal, () => emit('close')) // Outside click to close
</script>

<template>
  <Transition name="modal-outer">
    <div
      v-show="props.show"
      class="absolute bg-black/70 backdrop-blur-sm inset-0 p-4 flex flex-col items-center justify-center overflow-hidden z-50"
    >
      <!-- Model Content -->
      <Transition name="modal">
        <UseFocusTrap v-if="props.show" :options="{ immediate: true }">
          <div
            v-if="props.show"
            ref="modal"
            class="w-full max-w-[390px] rounded-xl bg-white dark:bg-gray-800"
          >
            <div class="flex items-center justify-between mb-4 pl-6 pr-4 pt-4">
              <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-300">
                {{ props.label }}
              </h3>
              <button class="btn-circle" @click="$emit('close')">
                <Icon icon="ri:close-line" class="icon" />
              </button>
            </div>
            <OverlayScrollbarsComponent
              :options="{ overflow: { x: 'hidden' } }"
              class="px-6 pb-4 max-h-[calc(100vh-100px)]"
              defer
            >
              <slot />
            </OverlayScrollbarsComponent>
          </div>
        </UseFocusTrap>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* Modal Outer Transition */
.modal-outer-enter-active,
.modal-outer-leave-active {
  @apply transition-all duration-200 ease-[cubic-bezier(0.52,0.02,0.19,1.02)];
}
.modal-outer-enter-from,
.modal-outer-leave-to {
  @apply opacity-0;
}
/* Main Modal Transition */
.modal-enter-active {
  @apply transition-all duration-200 ease-[cubic-bezier(0.52,0.02,0.19,1.02)] delay-[0.15s];
}
.modal-leave-active {
  @apply transition-all duration-200 ease-[cubic-bezier(0.52,0.02,0.19,1.02)];
}
.modal-enter-from {
  @apply opacity-0 scale-95;
}
.modal-leave-to {
  @apply scale-95;
}
</style>
