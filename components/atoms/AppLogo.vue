<template>
  <div class="flex items-center gap-3">
    <div class="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-background-dark font-bold">
      {{ initials }}
    </div>
    <span v-if="showText" class="font-bold text-lg tracking-tight dark:text-white">
      {{ name }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  initials?: string
  showText?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showText: true
})

const initials = computed(() => {
  if (props.initials) return props.initials
  const names = props.name.split(' ')
  return names.length >= 2 
    ? `${names[0][0]}${names[1][0]}` 
    : names[0].substring(0, 2)
})
</script>
