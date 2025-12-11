export const usePortfolioData = () => {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const fetchData = async () => {
    try {
      loading.value = true
      const response = await fetch('/data/portfolio-data.json')
      if (!response.ok) throw new Error('Failed to load portfolio data')
      data.value = await response.json()
    } catch (e) {
      error.value = e.message
      console.error('Error loading portfolio data:', e)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchData()
  })

  return {
    data,
    loading,
    error,
    personalInfo: computed(() => data.value?.personalInfo || {}),
    summary: computed(() => data.value?.summary || ''),
    stats: computed(() => data.value?.stats || []),
    skills: computed(() => data.value?.skills || []),
    experience: computed(() => data.value?.experience || []),
    education: computed(() => data.value?.education || []),
    projects: computed(() => data.value?.projects || []),
  }
}
