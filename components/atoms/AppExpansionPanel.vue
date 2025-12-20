<template>
  <div class="border border-gray-200 dark:border-[#254632] rounded-lg overflow-hidden">
    <button
      @click="toggle"
      class="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-[#1a3426] transition-colors"
    >
      <span class="text-left font-medium text-gray-900 dark:text-gray-100">
        {{ title }}
      </span>
      <span 
        class="material-symbols-outlined transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      >
        expand_more
      </span>
    </button>
    
    <div 
      class="overflow-hidden transition-all duration-300"
      :class="isOpen ? 'max-h-screen' : 'max-h-0'"
    >
      <div class="px-6 py-4 bg-gray-50 dark:bg-[#0d1f17] border-t border-gray-200 dark:border-[#254632]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false
})

const isOpen = ref(props.defaultOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>
