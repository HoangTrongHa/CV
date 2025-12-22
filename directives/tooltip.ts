import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-tooltip directive
 * Hiển thị tooltip khi hover vào element
 * 
 * @example
 * <button v-tooltip="'Tooltip text'">Hover me</button>
 * <button v-tooltip="{ text: 'Custom', position: 'top', delay: 500 }">Hover</button>
 */

interface TooltipElement extends HTMLElement {
  tooltipElement?: HTMLDivElement
  tooltipTimeout?: number
}

interface TooltipOptions {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  class?: string
}

const createTooltip = (text: string, position: string = 'top', customClass?: string): HTMLDivElement => {
  const tooltip = document.createElement('div')
  tooltip.className = `tooltip tooltip-${position} ${customClass || ''}`
  tooltip.textContent = text
  
  // Base styles
  Object.assign(tooltip.style, {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    zIndex: '9999',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.2s ease-in-out',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  })
  
  return tooltip
}

const positionTooltip = (el: HTMLElement, tooltip: HTMLDivElement, position: string) => {
  const rect = el.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const gap = 8
  
  let top = 0
  let left = 0
  
  switch (position) {
    case 'top':
      top = rect.top - tooltipRect.height - gap
      left = rect.left + (rect.width - tooltipRect.width) / 2
      break
    case 'bottom':
      top = rect.bottom + gap
      left = rect.left + (rect.width - tooltipRect.width) / 2
      break
    case 'left':
      top = rect.top + (rect.height - tooltipRect.height) / 2
      left = rect.left - tooltipRect.width - gap
      break
    case 'right':
      top = rect.top + (rect.height - tooltipRect.height) / 2
      left = rect.right + gap
      break
  }
  
  tooltip.style.top = `${top + window.scrollY}px`
  tooltip.style.left = `${left + window.scrollX}px`
}

export const tooltip: Directive = {
  mounted(el: TooltipElement, binding: DirectiveBinding) {
    let options: TooltipOptions
    
    if (typeof binding.value === 'string') {
      options = { text: binding.value }
    } else {
      options = binding.value
    }
    
    const { text, position = 'top', delay = 200, class: customClass } = options
    
    if (!text) return
    
    const showTooltip = () => {
      el.tooltipTimeout = window.setTimeout(() => {
        const tooltip = createTooltip(text, position, customClass)
        el.tooltipElement = tooltip
        document.body.appendChild(tooltip)
        
        // Position after append to get correct dimensions
        requestAnimationFrame(() => {
          positionTooltip(el, tooltip, position)
          tooltip.style.opacity = '1'
        })
      }, delay)
    }
    
    const hideTooltip = () => {
      if (el.tooltipTimeout) {
        clearTimeout(el.tooltipTimeout)
        el.tooltipTimeout = undefined
      }
      
      if (el.tooltipElement) {
        el.tooltipElement.style.opacity = '0'
        setTimeout(() => {
          if (el.tooltipElement) {
            document.body.removeChild(el.tooltipElement)
            el.tooltipElement = undefined
          }
        }, 200)
      }
    }
    
    el.addEventListener('mouseenter', showTooltip)
    el.addEventListener('mouseleave', hideTooltip)
    el.addEventListener('click', hideTooltip)
    
    // Store handlers for cleanup
    ;(el as any)._tooltipShowHandler = showTooltip
    ;(el as any)._tooltipHideHandler = hideTooltip
  },
  
  updated(el: TooltipElement, binding: DirectiveBinding) {
    // Update tooltip text if changed
    if (el.tooltipElement && binding.value !== binding.oldValue) {
      const newText = typeof binding.value === 'string' ? binding.value : binding.value.text
      el.tooltipElement.textContent = newText
    }
  },
  
  unmounted(el: TooltipElement) {
    if (el.tooltipTimeout) {
      clearTimeout(el.tooltipTimeout)
    }
    
    if (el.tooltipElement) {
      document.body.removeChild(el.tooltipElement)
    }
    
    const showHandler = (el as any)._tooltipShowHandler
    const hideHandler = (el as any)._tooltipHideHandler
    
    if (showHandler) {
      el.removeEventListener('mouseenter', showHandler)
    }
    if (hideHandler) {
      el.removeEventListener('mouseleave', hideHandler)
      el.removeEventListener('click', hideHandler)
    }
  }
}
