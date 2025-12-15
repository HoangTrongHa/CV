<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Toggle Button -->
    <button
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      :class="{ 'rotate-90': isOpen }"
    >
      <AppIcon name="weather_mix" size="24px" />
    </button>

    <!-- Effect Menu -->
    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="absolute bottom-16 right-0 bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-3 min-w-[200px]"
      >
        <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-3 px-2">
          Weather Effects
        </h3>
        
        <div class="space-y-1">
          <!-- Auto Mode -->
          <button
            @click="selectEffect('auto')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
            :class="selectedEffect === 'auto' 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'"
          >
            <AppIcon name="autorenew" size="20px" />
            <span class="text-sm font-medium">Auto (Weather)</span>
            <AppIcon v-if="selectedEffect === 'auto'" name="check" size="16px" class="ml-auto" />
          </button>

          <!-- Sun Effect -->
          <button
            @click="selectEffect('sun')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
            :class="selectedEffect === 'sun' 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'"
          >
            <span class="text-lg">☀️</span>
            <span class="text-sm font-medium">Sunny</span>
            <AppIcon v-if="selectedEffect === 'sun'" name="check" size="16px" class="ml-auto" />
          </button>

          <!-- Rain Effect -->
          <button
            @click="selectEffect('rain')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
            :class="selectedEffect === 'rain' 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'"
          >
            <span class="text-lg">🌧️</span>
            <span class="text-sm font-medium">Rainy</span>
            <AppIcon v-if="selectedEffect === 'rain'" name="check" size="16px" class="ml-auto" />
          </button>

          <!-- Snow Effect -->
          <button
            @click="selectEffect('snow')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
            :class="selectedEffect === 'snow' 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'"
          >
            <span class="text-lg">❄️</span>
            <span class="text-sm font-medium">Snowy</span>
            <AppIcon v-if="selectedEffect === 'snow'" name="check" size="16px" class="ml-auto" />
          </button>

          <!-- Dust Effect -->
          <button
            @click="selectEffect('dust')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
            :class="selectedEffect === 'dust' 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'"
          >
            <span class="text-lg">🌫️</span>
            <span class="text-sm font-medium">Dusty</span>
            <AppIcon v-if="selectedEffect === 'dust'" name="check" size="16px" class="ml-auto" />
          </button>

          <!-- None Effect -->
          <button
            @click="selectEffect('none')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
            :class="selectedEffect === 'none' 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'"
          >
            <AppIcon name="block" size="20px" />
            <span class="text-sm font-medium">None</span>
            <AppIcon v-if="selectedEffect === 'none'" name="check" size="16px" class="ml-auto" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const selectedEffect = ref<'auto' | 'sun' | 'rain' | 'snow' | 'dust' | 'none'>('auto')

const { setManualEffect } = useWeather()

const selectEffect = (effect: typeof selectedEffect.value) => {
  selectedEffect.value = effect
  setManualEffect(effect)
  isOpen.value = false
}

// Close menu when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (isOpen.value && !target.closest('.fixed.bottom-4.right-4')) {
      isOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => document.removeEventListener('click', handleClickOutside))
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
