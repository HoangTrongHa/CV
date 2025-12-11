<template>
  <div :class="containerClasses">
    <img 
      :src="src" 
      :alt="alt"
      class="w-full object-center"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = withDefaults(defineProps<Props>(), {
  src: '/images/avatar.jpg',
  alt: 'Avatar',
  size: '2xl'
})

const containerClasses = computed(() => {
  const sizes = {
    sm: 'h-32 w-32',
    md: 'h-48 w-48',
    lg: 'h-64 w-64',
    xl: 'h-80 w-80',
    '2xl': 'h-64 w-64 md:h-96 md:w-96'
  }
  
  return `${sizes[props.size]} rounded-full overflow-hidden relative bg-gradient-to-br from-surface-dark to-background-dark`
})
</script>
