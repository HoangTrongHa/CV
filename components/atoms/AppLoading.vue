<template>
  <Transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-background-dark">
      <div class="flex flex-col items-center gap-6">
        <!-- Animated Logo or Spinner -->
        <div class="relative">
          <!-- Outer Ring -->
          <div class="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <!-- Spinning Ring -->
          <div class="absolute inset-0 w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <!-- Inner Pulse -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <!-- Loading Text -->
        <div class="flex flex-col items-center gap-2">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white animate-pulse">
            {{ loadingText }}
          </h3>
          <div class="flex gap-1">
            <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms"></span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  isLoading?: boolean
  loadingText?: string
}

withDefaults(defineProps<Props>(), {
  isLoading: true,
  loadingText: 'Loading...'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
