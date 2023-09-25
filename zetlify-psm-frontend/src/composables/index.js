import { reactive } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

// Dark Mode
const isDark = useDark()
const toggleDarkMode = useToggle(isDark)

// Sidebar State
const sidebarState = reactive({
  isOpen: window.innerWidth > 1024,
  isHovered: false,
  handleHover(value) {
    if (window.innerWidth < 1024) {
      return
    }
    sidebarState.isHovered = value
  },
  handleWindowResize() {
    if (window.innerWidth <= 1024) {
      sidebarState.isOpen = false
    } else {
      sidebarState.isOpen = true
    }
  }
})

export { isDark, toggleDarkMode, sidebarState }
