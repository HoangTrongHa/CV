<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center rounded-full font-bold tracking-wider uppercase'
  
  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-[#254632] text-slate-700 dark:text-gray-300',
    outline: 'border-2 border-primary text-primary'
  }
  
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-3 py-1'
  }
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]}`
})
</script>
