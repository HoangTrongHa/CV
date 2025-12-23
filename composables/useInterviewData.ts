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
  
  // Load subcategory từ file riêng (cho Frontend và Cloud)
  const loadSubcategory = async (categoryId: string, subcategoryId: string): Promise<Subcategory | null> => {
    const cacheKey = `${categoryId}-${subcategoryId}`
    
    // Kiểm tra cache
    if (subcategoryCache.value[cacheKey]) {
      return subcategoryCache.value[cacheKey]
    }

    try {
      // Frontend, Cloud và SOLID có file riêng
      if (categoryId === 'frontend' || categoryId === 'cloud' || categoryId === 'solid') {
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

  // Inject Cloud & Architecture category vào data
  const categoriesWithCloud = computed(() => {
    if (!data.value) return []
    
    const cats = [...data.value.categories]
    
    // Tạo Cloud & Architecture category
    const cloudCategory: Category = {
      id: 'cloud',
      name: 'Cloud & Architecture',
      icon: 'cloud',
      color: '#673ab7',
      subcategories: [
        {
          id: 'microservice',
          name: 'Microservice',
          description: 'Microservice Architecture patterns and best practices',
          questions: []
        },
        {
          id: 'docker',
          name: 'Docker',
          description: 'Container technology and Docker ecosystem',
          questions: []
        }
      ]
    }
    
    // Tạo SOLID & Design Patterns category
    const solidCategory: Category = {
      id: 'solid',
      name: 'OOP & Design Patterns',
      icon: 'architecture',
      color: '#ff5722',
      subcategories: [
        {
          id: 'oop',
          name: 'OOP (Lập trình hướng đối tượng)',
          description: 'Các câu hỏi về Lập trình hướng đối tượng và 4 tính chất: Trừu tượng, Đóng gói, Kế thừa, Đa hình',
          questions: []
        },
        {
          id: 'solid_design_patterns',
          name: 'SOLID & Design Patterns',
          description: 'Các câu hỏi chuyên sâu về nguyên lý SOLID và các mẫu thiết kế phổ biến',
          questions: []
        }
      ]
    }
    
    // Xóa microservice khỏi backend
    const backendIndex = cats.findIndex(c => c.id === 'backend')
    if (backendIndex !== -1 && cats[backendIndex]) {
      const backend = cats[backendIndex]
      cats[backendIndex] = {
        id: backend.id,
        name: backend.name,
        icon: backend.icon,
        color: backend.color,
        subcategories: backend.subcategories.filter(s => s.id !== 'microservice')
      }
    }
    
    // Xóa docker khỏi devops
    const devopsIndex = cats.findIndex(c => c.id === 'devops')
    if (devopsIndex !== -1 && cats[devopsIndex]) {
      const devops = cats[devopsIndex]
      cats[devopsIndex] = {
        id: devops.id,
        name: devops.name,
        icon: devops.icon,
        color: devops.color,
        subcategories: devops.subcategories.filter(s => s.id !== 'docker')
      }
    }
    
    // Thêm Cloud category sau Frontend (index 1)
    cats.splice(1, 0, cloudCategory)
    
    // Thêm SOLID category sau Backend
    const backendIdx = cats.findIndex(c => c.id === 'backend')
    if (backendIdx !== -1) {
      cats.splice(backendIdx + 1, 0, solidCategory)
    }
    
    return cats
  })

  // Auto fetch on mount
  if (typeof window !== 'undefined') {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    categories: categoriesWithCloud,
    totalQuestions,
    getCategory,
    getSubcategory,
    loadSubcategory,
    filterQuestionsByLevel,
    fetchData
  }
}
