import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-copy directive
 * Copy text vào clipboard khi click vào element
 * 
 * @example
 * <button v-copy="'Text to copy'">Click to copy</button>
 * <div v-copy="{ text: 'Custom text', success: handleSuccess }">Copy me</div>
 */

interface CopyOptions {
  text: string
  success?: (text: string) => void
  error?: (error: Error) => void
}

interface CopyElement extends HTMLElement {
  copyClickHandler?: (event: MouseEvent) => void
}

const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    // Modern clipboard API
    await navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      textArea.remove()
    } catch (error) {
      textArea.remove()
      throw error
    }
  }
}

const showCopyFeedback = (el: HTMLElement) => {
  // Add visual feedback
  const originalCursor = el.style.cursor
  const originalTransition = el.style.transition
  
  el.style.cursor = 'pointer'
  el.style.transition = 'all 0.2s ease'
  
  // Flash effect
  el.style.opacity = '0.6'
  setTimeout(() => {
    el.style.opacity = '1'
    setTimeout(() => {
      el.style.cursor = originalCursor
      el.style.transition = originalTransition
    }, 200)
  }, 100)
}

export const copy: Directive = {
  mounted(el: CopyElement, binding: DirectiveBinding) {
    let options: CopyOptions
    
    if (typeof binding.value === 'string') {
      options = { text: binding.value }
    } else {
      options = binding.value
    }
    
    const { text, success, error } = options
    
    if (!text) return
    
    // Make element look clickable
    if (!el.style.cursor) {
      el.style.cursor = 'pointer'
    }
    
    el.copyClickHandler = async (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      
      try {
        await copyToClipboard(text)
        showCopyFeedback(el)
        
        if (success) {
          success(text)
        } else {
          // Default success feedback
          console.log(`✓ Copied to clipboard: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`)
        }
      } catch (err) {
        if (error) {
          error(err as Error)
        } else {
          console.error('Failed to copy text:', err)
        }
      }
    }
    
    el.addEventListener('click', el.copyClickHandler)
  },
  
  updated(el: CopyElement, binding: DirectiveBinding) {
    // Remove old handler
    if (el.copyClickHandler) {
      el.removeEventListener('click', el.copyClickHandler)
    }
    
    // Re-mount with new value
    let options: CopyOptions
    
    if (typeof binding.value === 'string') {
      options = { text: binding.value }
    } else {
      options = binding.value
    }
    
    const { text, success, error } = options
    
    if (!text) return
    
    el.copyClickHandler = async (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      
      try {
        await copyToClipboard(text)
        showCopyFeedback(el)
        
        if (success) {
          success(text)
        }
      } catch (err) {
        if (error) {
          error(err as Error)
        }
      }
    }
    
    el.addEventListener('click', el.copyClickHandler)
  },
  
  unmounted(el: CopyElement) {
    if (el.copyClickHandler) {
      el.removeEventListener('click', el.copyClickHandler)
      delete el.copyClickHandler
    }
  }
}
