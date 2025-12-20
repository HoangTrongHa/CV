import { ref, computed } from 'vue'

export interface Question {
  question: string
  answer: string
  level: 'fresher' | 'middle' | 'senior'
}

export interface Subcategory {
  id: string
  name: string
  description: string
  questions: Question[]
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  subcategories: Subcategory[]
}

export interface InterviewData {
  categories: Category[]
}

export const useInterviewData = () => {
  const data = ref<InterviewData | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  // Cache cho subcategories đã load
  const subcategoryCache = ref<Record<string, Subcategory>>({})

  const fetchData = async () => {
    try {
      loading.value = true
      const response = await fetch('/data/interview-data.json')
      if (!response.ok) throw new Error('Failed to fetch interview data')
      data.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      console.error('Error loading interview data:', e)
    } finally {
      loading.value = false
    }
  }
  
  // Load subcategory từ file riêng (cho Frontend)
  const loadSubcategory = async (categoryId: string, subcategoryId: string): Promise<Subcategory | null> => {
    const cacheKey = `${categoryId}-${subcategoryId}`
    
    // Kiểm tra cache
    if (subcategoryCache.value[cacheKey]) {
      return subcategoryCache.value[cacheKey]
    }

    try {
      // Chỉ Frontend mới có file riêng
      if (categoryId === 'frontend') {
        const response = await fetch(`/data/interview-${subcategoryId}.json`)
        if (response.ok) {
          const subcategoryData = await response.json()
          subcategoryCache.value[cacheKey] = subcategoryData
          return subcategoryData
        }
      }
      
      // Các category khác vẫn lấy từ file chính
      const category = categories.value.find(cat => cat.id === categoryId)
      const subcategory = category?.subcategories.find(sub => sub.id === subcategoryId)
      if (subcategory) {
        subcategoryCache.value[cacheKey] = subcategory
        return subcategory
      }
      
      return null
    } catch (err) {
      console.error(`Error loading subcategory ${subcategoryId}:`, err)
      return null
    }
  }

  // Computed properties
  const categories = computed(() => data.value?.categories || [])
  
  const totalQuestions = computed(() => {
    return categories.value.reduce((total, cat) => {
      return total + cat.subcategories.reduce((subTotal, sub) => {
        return subTotal + sub.questions.length
      }, 0)
    }, 0)
  })

  const getCategory = (id: string) => {
    return categories.value.find(cat => cat.id === id)
  }

  const getSubcategory = (categoryId: string, subcategoryId: string) => {
    const category = getCategory(categoryId)
    return category?.subcategories.find(sub => sub.id === subcategoryId)
  }

  const filterQuestionsByLevel = (questions: Question[], level: string) => {
    if (level === 'all') return questions
    return questions.filter(q => q.level === level)
  }

  // Auto fetch on mount
  if (typeof window !== 'undefined') {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    categories,
    totalQuestions,
    getCategory,
    getSubcategory,
    loadSubcategory,
    filterQuestionsByLevel,
    fetchData
  }
}
