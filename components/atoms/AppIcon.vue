<template>
  <span 
    class="material-symbols-outlined" 
    :class="iconClasses"
    :style="{ fontSize: size }"
  >
    {{ name }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '24px',
  color: 'currentColor'
})

const iconClasses = computed(() => {
  return props.color ? `text-${props.color}` : ''
})
</script>
