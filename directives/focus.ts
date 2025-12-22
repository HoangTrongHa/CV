import type { Directive } from 'vue'

/**
 * v-focus directive
 * Auto focus vào input/textarea khi component được mount
 * 
 * @example
 * <input v-focus type="text" />
 * <input v-focus="shouldFocus" type="text" />
 */

export const focus: Directive = {
  mounted(el: HTMLElement, binding) {
    // Nếu không có value hoặc value = true thì focus
    if (binding.value === undefined || binding.value) {
      // Use nextTick to ensure DOM is ready
      setTimeout(() => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          el.focus()
        } else {
          // Nếu không phải input/textarea, tìm input con đầu tiên
          const input = el.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement
          if (input) {
            input.focus()
          }
        }
      }, 0)
    }
  },
  
  updated(el: HTMLElement, binding) {
    // Focus lại khi value thay đổi thành true
    if (binding.value && !binding.oldValue) {
      setTimeout(() => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          el.focus()
        } else {
          const input = el.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement
          if (input) {
            input.focus()
          }
        }
      }, 0)
    }
  }
}
