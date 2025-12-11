<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  fullWidth: false
})

defineEmits(['click'])

const tag = computed(() => props.href ? 'a' : 'button')

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-bold rounded-full transition-all transform hover:-translate-y-0.5'
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-background-dark shadow-lg shadow-primary/20',
    secondary: 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-[#254632] hover:border-primary dark:hover:border-primary text-slate-700 dark:text-gray-300',
    ghost: 'hover:text-primary dark:text-gray-300 dark:hover:text-primary'
  }
  
  const sizes = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-2 px-6',
    lg: 'text-lg py-4 px-10'
  }
  
  const width = props.fullWidth ? 'w-full' : ''
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${width}`
})
</script>
