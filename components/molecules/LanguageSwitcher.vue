<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      :title="'Language'"
    >
      <AppIcon name="language" size="20px" class="text-slate-700 dark:text-gray-300" />
      <span class="text-sm font-medium text-slate-700 dark:text-gray-300">
        {{ currentLocaleName }}
      </span>
      <AppIcon 
        name="expand_more" 
        size="20px" 
        class="text-slate-700 dark:text-gray-300 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute top-full right-0 mt-2 bg-white dark:bg-surface-dark rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 min-w-[160px] z-50"
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3"
          :class="{ 'bg-primary/10': currentLocale === locale.code }"
        >
          <span class="text-sm font-medium text-slate-700 dark:text-gray-300">
            {{ locale.name }}
          </span>
          <AppIcon
            v-if="currentLocale === locale.code"
            name="check"
            size="16px"
            class="ml-auto text-primary"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)
const currentLocaleName = computed(() => {
  const current = availableLocales.value.find(l => l.code === currentLocale.value)
  return current?.name || 'English'
})


const switchLanguage = (code: string) => {
  setLocale(code)
  isOpen.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
