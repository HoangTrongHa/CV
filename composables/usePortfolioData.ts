export const usePortfolioData = () => {
  const { locale } = useI18n()
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const fetchData = async () => {
    try {
      loading.value = true
      const lang = locale.value
      const fileName = lang === 'en' ? 'portfolio-data.json' : `portfolio-data-${lang}.json`
      const response = await fetch(`/data/${fileName}`)
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

  // Watch for locale changes and reload data
  watch(locale, () => {
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
