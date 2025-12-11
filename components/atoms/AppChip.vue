<template>
  <span :class="chipClasses">
    <AppIcon v-if="icon" :name="icon" size="20px" />
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  variant?: 'default' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const chipClasses = computed(() => {
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all'
  
  const variants = {
    default: 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-[#254632] text-slate-700 dark:text-gray-300',
    primary: 'bg-primary/10 text-primary border border-primary/20'
  }
  
  return `${base} ${variants[props.variant]}`
})
</script>
