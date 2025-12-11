<template>
  <div class="w-full bg-gray-200 dark:bg-background-dark rounded-full h-2.5 overflow-hidden">
    <div 
      class="bg-primary h-2.5 rounded-full transition-all duration-500"
      :style="{ width: `${value}%` }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number
  max?: number
}

withDefaults(defineProps<Props>(), {
  max: 100
})
</script>
