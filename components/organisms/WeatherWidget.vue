<template>
  <Transition name="slide-down">
    <div
      v-if="weatherData"
      class="fixed top-20 right-4 z-40 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[200px]"
    >
      <div class="flex items-center gap-3">
        <!-- Weather Icon -->
        <div class="flex-shrink-0">
          <img
            v-if="weatherData.icon"
            :src="`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`"
            :alt="weatherData.condition"
            class="w-16 h-16"
          />
        </div>

        <!-- Weather Info -->
        <div class="flex-1">
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-bold text-slate-900 dark:text-white">
              {{ weatherData.temp }}°
            </span>
            <span class="text-sm text-slate-500 dark:text-gray-400">C</span>
          </div>
          <p class="text-sm font-medium text-slate-700 dark:text-gray-300 capitalize">
            {{ weatherData.description }}
          </p>
          <p class="text-xs text-slate-500 dark:text-gray-400 flex items-center gap-1 mt-1">
            <AppIcon name="location_on" size="14px" />
            Hà Nội
          </p>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-2 text-xs">
        <div class="flex items-center gap-1 text-slate-600 dark:text-gray-400">
          <AppIcon name="water_drop" size="14px" />
          <span>{{ weatherData.humidity }}%</span>
        </div>
        <div class="flex items-center gap-1 text-slate-600 dark:text-gray-400">
          <AppIcon name="air" size="14px" />
          <span>{{ weatherData.windSpeed }} m/s</span>
        </div>
        <div v-if="weatherData.aqi" class="col-span-2 flex items-center gap-1" :class="getAQIColor(weatherData.aqi)">
          <AppIcon name="blur_on" size="14px" />
          <span>AQI: {{ getAQILabel(weatherData.aqi) }}</span>
        </div>
      </div>

      <!-- Refresh Button -->
      <button
        @click="fetchWeather"
        :disabled="loading"
        class="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <AppIcon name="refresh" size="16px" :class="{ 'animate-spin': loading }" />
        {{ loading ? 'Updating...' : 'Refresh' }}
      </button>
    </div>
  </Transition>

  <!-- Loading State -->
  <div
    v-if="loading && !weatherData"
    class="fixed top-20 right-4 z-40 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
  >
    <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
      <AppIcon name="refresh" size="16px" class="animate-spin" />
      Loading weather...
    </div>
  </div>

  <!-- Error State -->
  <div
    v-if="error && !weatherData"
    class="fixed top-20 right-4 z-40 bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-red-800 p-4"
  >
    <div class="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
      <AppIcon name="error" size="16px" />
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { weatherData, loading, error, fetchWeather } = useWeather()

const getAQILabel = (aqi: number) => {
  const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
  return labels[aqi - 1] || 'Unknown'
}

const getAQIColor = (aqi: number) => {
  if (aqi <= 2) return 'text-green-600 dark:text-green-400'
  if (aqi === 3) return 'text-yellow-600 dark:text-yellow-400'
  if (aqi === 4) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
