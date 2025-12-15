<template>
  <div ref="skillBarRef" class="group cursor-pointer" @mouseenter="handleHover" @click="handleHover">
    <div class="flex justify-between mb-2">
      <span class="font-semibold dark:text-gray-200">{{ name }}</span>
      <span class="text-primary font-bold">{{ years }} {{ years > 1 ? 'years' : 'year' }}</span>
    </div>
    <div class="w-full bg-gray-200 dark:bg-background-dark rounded-full h-2.5 overflow-hidden">
      <div 
        class="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
        :style="{ width: isAnimated ? `${(years / 7) * 100}%` : '0%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  years: number
}

defineProps<Props>()

const skillBarRef = ref<HTMLElement | null>(null)
const isAnimated = ref(false)

const handleHover = () => {
  if (!isAnimated.value) {
    isAnimated.value = true
  }
}

onMounted(() => {
  if (!skillBarRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isAnimated.value) {
          setTimeout(() => {
            isAnimated.value = true
          }, 100)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px' }
  )

  observer.observe(skillBarRef.value)

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>
