import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-click-outside directive
 * Phát hiện khi user click bên ngoài element
 * 
 * @example
 * <div v-click-outside="handleClickOutside">
 *   Click outside me
 * </div>
 */

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void
}

export const clickOutside: Directive = {
  mounted(el: ClickOutsideElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      // Check if click was outside the element and its children
      if (!(el === event.target || el.contains(event.target as Node))) {
        // Call the provided method
        if (typeof binding.value === 'function') {
          binding.value(event)
        }
      }
    }
    
    // Add event listener với small delay để tránh trigger ngay lập tức
    setTimeout(() => {
      document.addEventListener('click', el.clickOutsideEvent!)
    }, 0)
  },
  
  unmounted(el: ClickOutsideElement) {
    // Clean up event listener
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
      delete el.clickOutsideEvent
    }
  }
}
