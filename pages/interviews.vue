<template>
  <div class="min-h-screen bg-white dark:bg-background-dark">
    <!-- Hero Section -->
    <section class="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <NuxtLink to="/" class="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-primary hover:text-primary/80 transition-colors">
              <span class="material-symbols-outlined text-xl sm:text-2xl">arrow_back</span>
              <span>Về trang chủ</span>
            </NuxtLink>
            <button
              @click="handleLogout"
              class="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              <span class="material-symbols-outlined text-xl sm:text-2xl">logout</span>
              <span>Đăng xuất</span>
            </button>
          </div>
          <div class="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span class="material-symbols-outlined text-primary text-xl sm:text-2xl">person</span>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Xin chào, <span class="font-semibold text-primary">{{ user?.username }}</span>
            </p>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            Kinh nghiệm phỏng vấn
          </h1>
          <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-4">
            Tổng hợp câu hỏi phỏng vấn từ Frontend đến Backend, Database, DevOps và nhiều hơn nữa
          </p>
          <div v-if="!loading" class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="material-symbols-outlined text-primary text-lg sm:text-xl">category</span>
              <span>{{ categories.length }} danh mục</span>
            </div>
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="material-symbols-outlined text-primary text-lg sm:text-xl">quiz</span>
              <span>{{ totalQuestions }}+ câu hỏi</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Đang tải dữ liệu...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <span class="material-symbols-outlined text-5xl text-red-600 dark:text-red-400 mb-4">error</span>
        <h3 class="text-xl font-semibold text-red-900 dark:text-red-200 mb-2">Lỗi tải dữ liệu</h3>
        <p class="text-red-700 dark:text-red-300">{{ error }}</p>
      </div>
    </div>

    <!-- Categories Tabs -->
    <div v-else class="sticky top-0 sm:top-16 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-[#254632]">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex gap-1.5 sm:gap-2 overflow-x-auto py-2 sm:py-3 md:py-4 scrollbar-hide">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0"
            :class="activeCategory === category.id 
              ? 'bg-primary text-white shadow-md' 
              : 'bg-gray-100 dark:bg-[#1a3426] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#254632]'"
          >
            <span class="material-symbols-outlined text-base sm:text-lg">{{ category.icon }}</span>
            <span class="font-medium hidden xs:inline">{{ category.name }}</span>
            <span class="font-medium xs:hidden">{{ category.name.split(' ')[0] }}</span>
            <span class="text-xs opacity-75">({{ category.subcategories.length }})</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Subcategories Tabs (for Frontend and Cloud) -->
    <div v-if="!loading && !error && (activeCategory === 'frontend' || activeCategory === 'cloud')" class="bg-white/95 dark:bg-background-dark/95 border-b border-gray-200 dark:border-[#254632]">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex gap-1.5 sm:gap-2 overflow-x-auto py-2 sm:py-3 scrollbar-hide">
          <button
            v-for="subcategory in getCurrentCategory?.subcategories"
            :key="subcategory.id"
            @click="activeSubcategory = subcategory.id"
            class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap text-xs sm:text-sm font-medium transition-all flex-shrink-0"
            :class="activeSubcategory === subcategory.id
              ? 'bg-primary/10 text-primary border-2 border-primary'
              : 'bg-gray-100 dark:bg-[#1a3426] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#254632]'"
          >
            {{ subcategory.name.replace('Câu hỏi phỏng vấn ', '') }}
            <span v-if="getLoadedSubcategoryData(subcategory.id)" class="ml-1 text-xs opacity-75">({{ getLoadedSubcategoryData(subcategory.id).questions.length }})</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-if="!loading && !error" class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <!-- Frontend and Cloud with Subcategory Tabs -->
      <div v-if="activeCategory === 'frontend' || activeCategory === 'cloud'">
        <div v-for="subcategory in getCurrentCategory?.subcategories" :key="subcategory.id">
          <div v-show="activeSubcategory === subcategory.id" class="bg-gray-50 dark:bg-[#0d1f17] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#254632]">
            <!-- Loading state for subcategory -->
            <div v-if="loadingSubcategory && !getLoadedSubcategoryData(subcategory.id)" class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
              <p class="mt-4 text-gray-600 dark:text-gray-400">Đang tải câu hỏi...</p>
            </div>
            
            <!-- Subcategory Content -->
            <div v-else-if="getLoadedSubcategoryData(subcategory.id)" class="w-full">
              <!-- Subcategory Header -->
              <div class="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div 
                  class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10"
                >
                  <span class="material-symbols-outlined text-xl sm:text-2xl text-primary">code</span>
                </div>
                <div class="flex-1 w-full">
                  <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                    {{ getLoadedSubcategoryData(subcategory.id).name }}
                  </h2>
                  <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                    {{ getLoadedSubcategoryData(subcategory.id).description }}
                  </p>
                  <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <span>{{ getLoadedSubcategoryData(subcategory.id).questions.length }} câu hỏi</span>
                    <span class="hidden xs:inline">•</span>
                    <span>{{ getQuestionsByLevel(getLoadedSubcategoryData(subcategory.id).questions, 'fresher') }} Fresher</span>
                    <span class="hidden xs:inline">•</span>
                    <span>{{ getQuestionsByLevel(getLoadedSubcategoryData(subcategory.id).questions, 'middle') }} Middle</span>
                    <span class="hidden xs:inline">•</span>
                    <span>{{ getQuestionsByLevel(getLoadedSubcategoryData(subcategory.id).questions, 'senior') }} Senior</span>
                  </div>
                </div>
              </div>

              <!-- Level Filter -->
              <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <button
                  v-for="level in ['all', 'fresher', 'middle', 'senior']"
                  :key="level"
                  @click="activeLevels[subcategory.id] = level"
                  class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all flex-shrink-0"
                  :class="(activeLevels[subcategory.id] || 'all') === level
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-background-dark text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a3426]'"
                >
                  {{ level === 'all' ? 'Tất cả' : level.charAt(0).toUpperCase() + level.slice(1) }}
                </button>
              </div>

              <!-- Questions -->
              <div class="space-y-3">
                <QuestionItem
                  v-for="(question, index) in filterQuestionsByLevel(getLoadedSubcategoryData(subcategory.id).questions, activeLevels[subcategory.id] || 'all')"
                  :key="index"
                  :question="question.question"
                  :answer="question.answer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Categories (Backend, Database, etc.) -->
      <div v-else>
        <div v-for="category in categories" :key="category.id">
          <div v-show="activeCategory === category.id">
            <!-- Subcategories Grid -->
            <div class="grid gap-4 sm:gap-6 md:gap-8">
              <div 
                v-for="subcategory in category.subcategories" 
                :key="subcategory.id"
                class="bg-gray-50 dark:bg-[#0d1f17] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#254632]"
              >
                <!-- Subcategory Header -->
                <div class="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div 
                    class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                    :style="{ backgroundColor: category.color + '20' }"
                  >
                    <span 
                      class="material-symbols-outlined text-xl sm:text-2xl"
                      :style="{ color: category.color }"
                    >
                      {{ category.icon }}
                    </span>
                  </div>
                  <div class="flex-1 w-full">
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                      {{ subcategory.name }}
                    </h2>
                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                      {{ subcategory.description }}
                    </p>
                    <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <span>{{ subcategory.questions.length }} câu hỏi</span>
                      <span class="hidden xs:inline">•</span>
                      <span>{{ getQuestionsByLevel(subcategory.questions, 'fresher') }} Fresher</span>
                      <span class="hidden xs:inline">•</span>
                      <span>{{ getQuestionsByLevel(subcategory.questions, 'middle') }} Middle</span>
                      <span class="hidden xs:inline">•</span>
                      <span>{{ getQuestionsByLevel(subcategory.questions, 'senior') }} Senior</span>
                    </div>
                  </div>
                </div>

                <!-- Level Filter -->
                <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <button
                    v-for="level in ['all', 'fresher', 'middle', 'senior']"
                    :key="level"
                    @click="activeLevels[subcategory.id] = level"
                    class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all flex-shrink-0"
                    :class="(activeLevels[subcategory.id] || 'all') === level
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-background-dark text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a3426]'"
                  >
                    {{ level === 'all' ? 'Tất cả' : level.charAt(0).toUpperCase() + level.slice(1) }}
                  </button>
                </div>

                <!-- Questions -->
                <div class="space-y-3">
                  <QuestionItem
                    v-for="(question, index) in filterQuestionsByLevel(subcategory.questions, activeLevels[subcategory.id] || 'all')"
                    :key="index"
                    :question="question.question"
                    :answer="question.answer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Question } from '~/composables/useInterviewData'

// Auth middleware
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
const { categories, totalQuestions, loading, error, filterQuestionsByLevel, loadSubcategory } = useInterviewData()

const activeCategory = ref('frontend')
const activeSubcategory = ref('')
const activeLevels = ref<Record<string, string>>({})

// State để lưu dữ liệu subcategory đã load
const loadedSubcategories = ref<Record<string, any>>({})
const loadingSubcategory = ref(false)

const handleLogout = () => {
  logout()
}

// Load subcategory data khi cần
const loadSubcategoryData = async (categoryId: string, subcategoryId: string) => {
  const cacheKey = `${categoryId}-${subcategoryId}`
  
  if (loadedSubcategories.value[cacheKey]) {
    return loadedSubcategories.value[cacheKey]
  }
  
  loadingSubcategory.value = true
  const data = await loadSubcategory(categoryId, subcategoryId)
  if (data) {
    loadedSubcategories.value[cacheKey] = data
  }
  loadingSubcategory.value = false
  return data
}

// Get current category
const getCurrentCategory = computed(() => {
  return categories.value.find(cat => cat.id === activeCategory.value)
})

// Get loaded subcategory data
const getLoadedSubcategoryData = (subcategoryId: string) => {
  const cacheKey = `${activeCategory.value}-${subcategoryId}`
  return loadedSubcategories.value[cacheKey]
}

// Set default active category and subcategory when data loads
watch(categories, (newCategories) => {
  if (newCategories.length > 0) {
    if (!activeCategory.value && newCategories[0]) {
      activeCategory.value = newCategories[0].id
    }
    const currentCat = newCategories.find(cat => cat.id === activeCategory.value)
    if (currentCat && currentCat.subcategories.length > 0 && currentCat.subcategories[0] && !activeSubcategory.value) {
      activeSubcategory.value = currentCat.subcategories[0].id
      // Load data cho subcategory đầu tiên
      loadSubcategoryData(activeCategory.value, activeSubcategory.value)
    }
  }
})

// Reset subcategory when changing category
watch(activeCategory, (newCategory) => {
  const category = categories.value.find(cat => cat.id === newCategory)
  if ((category?.id === 'frontend' || category?.id === 'cloud') && category.subcategories.length > 0 && category.subcategories[0]) {
    activeSubcategory.value = category.subcategories[0].id
    // Load data cho subcategory mới
    loadSubcategoryData(newCategory, activeSubcategory.value)
  }
})

// Load data khi chuyển subcategory
watch(activeSubcategory, (newSubcategory) => {
  if (newSubcategory && (activeCategory.value === 'frontend' || activeCategory.value === 'cloud')) {
    loadSubcategoryData(activeCategory.value, newSubcategory)
  }
})

const getQuestionsByLevel = (questions: Question[], level: string) => {
  return questions.filter((q: Question) => q.level === level).length
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Prose styles for answer content */
:deep(.prose) {
  color: inherit;
}

:deep(.prose pre) {
  @apply bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto my-4;
}

:deep(.prose code) {
  @apply text-primary bg-primary/10 px-1.5 py-0.5 rounded text-sm;
}

:deep(.prose pre code) {
  @apply bg-transparent p-0 text-gray-100;
}

:deep(.prose a) {
  @apply text-primary hover:underline;
}

:deep(.prose ul) {
  @apply list-disc list-inside my-4;
}

:deep(.prose ol) {
  @apply list-decimal list-inside my-4;
}

:deep(.prose li) {
  @apply my-2;
}

:deep(.prose strong) {
  @apply font-semibold text-gray-900 dark:text-white;
}

:deep(.prose p) {
  @apply my-3 leading-relaxed;
}

:deep(.prose img) {
  @apply rounded-lg my-4 max-w-full;
}
</style>
