import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-lazy-load directive
 * Lazy load images sử dụng Intersection Observer API
 * 
 * @example
 * <img v-lazy-load="'/path/to/image.jpg'" alt="Lazy" />
 * <img v-lazy-load="{ src: '/image.jpg', placeholder: '/loading.gif' }" alt="Lazy" />
 */

interface LazyLoadElement extends HTMLImageElement {
  lazyLoadObserver?: IntersectionObserver
}

interface LazyLoadOptions {
  src: string
  placeholder?: string
  threshold?: number
  rootMargin?: string
}

export const lazyLoad: Directive = {
  mounted(el: LazyLoadElement, binding: DirectiveBinding) {
    // Parse options
    let options: LazyLoadOptions
    if (typeof binding.value === 'string') {
      options = { src: binding.value }
    } else {
      options = binding.value
    }
    
    const { src, placeholder, threshold = 0.1, rootMargin = '50px' } = options
    
    // Set placeholder if provided
    if (placeholder) {
      el.src = placeholder
    } else {
      // Set a tiny transparent placeholder
      el.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E'
    }
    
    // Add loading class
    el.classList.add('lazy-loading')
    
    // Create intersection observer
    el.lazyLoadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load the actual image
            const img = entry.target as HTMLImageElement
            img.src = src
            
            img.onload = () => {
              img.classList.remove('lazy-loading')
              img.classList.add('lazy-loaded')
            }
            
            img.onerror = () => {
              img.classList.remove('lazy-loading')
              img.classList.add('lazy-error')
            }
            
            // Stop observing once loaded
            if (el.lazyLoadObserver) {
              el.lazyLoadObserver.unobserve(img)
            }
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )
    
    // Start observing
    el.lazyLoadObserver.observe(el)
  },
  
  updated(el: LazyLoadElement, binding: DirectiveBinding) {
    // Update image source if binding value changes
    if (binding.value !== binding.oldValue) {
      let newSrc: string
      if (typeof binding.value === 'string') {
        newSrc = binding.value
      } else {
        newSrc = binding.value.src
      }
      
      el.src = newSrc
    }
  },
  
  unmounted(el: LazyLoadElement) {
    // Clean up observer
    if (el.lazyLoadObserver) {
      el.lazyLoadObserver.disconnect()
      delete el.lazyLoadObserver
    }
  }
}
