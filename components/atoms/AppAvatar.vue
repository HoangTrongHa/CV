<template>
  <div :class="avatarClasses">
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt"
      class="w-full h-full object-cover"
    />
    <div v-else class="w-full h-full flex items-center justify-center font-bold text-background-dark">
      {{ initials }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  rounded: false,
  alt: 'Avatar'
})

const initials = computed(() => {
  if (!props.name) return ''
  const names = props.name.split(' ')
  if (names.length >= 2 && names[0] && names[1]) {
    return `${names[0][0]}${names[1][0]}`
  }
  return names[0] ? names[0].substring(0, 2) : ''
})

const avatarClasses = computed(() => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-32 w-32',
    '2xl': 'h-64 w-64 md:h-96 md:w-96'
  }
  
  const shape = props.rounded ? 'rounded-lg' : 'rounded-full'
  const base = 'bg-primary overflow-hidden flex-shrink-0'
  
  return `${base} ${sizes[props.size]} ${shape}`
})
</script>
