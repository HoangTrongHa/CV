export interface WeatherData {
  temp: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  aqi?: number
  icon: string
}

// Global state - shared across all components
const weatherData = ref<WeatherData | null>(null)
const weatherEffect = ref<'snow' | 'rain' | 'sun' | 'dust' | 'none'>('none')
const manualEffect = ref<'auto' | 'snow' | 'rain' | 'sun' | 'dust' | 'none'>('auto')
const loading = ref(false)
const error = ref<string | null>(null)

export const useWeather = () => {

  const getLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (error) => {
          console.warn('Geolocation error:', error.message)
          reject(error)
        },
        { timeout: 5000 }
      )
    })
  }

  const fetchWeather = async () => {
    loading.value = true
    error.value = null

    try {
      const API_KEY = '7be2200bc4b5867385235de8047fbd37'
      
      let weatherUrl: string
      
      // Try to get user's location first
      try {
        const coords = await getLocation()
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
      } catch (geoError) {
        // Fallback to Da Nang if geolocation fails
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Da Nang,VN&appid=${API_KEY}&units=metric`
      }

      // Fetch current weather with better error handling
      const weatherResponse = await fetch(weatherUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json().catch(() => ({}))
        console.error('Weather API Error:', errorData)
        throw new Error(errorData.message || `HTTP ${weatherResponse.status}: Failed to fetch weather`)
      }

      const data = await weatherResponse.json()

      // Fetch air quality
      let aqi = undefined
      try {
        const aqiResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`
        )
        if (aqiResponse.ok) {
          const aqiData = await aqiResponse.json()
          aqi = aqiData.list[0]?.main?.aqi
        }
      } catch (e) {
        console.warn('Could not fetch AQI data', e)
      }

      weatherData.value = {
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        aqi,
        icon: data.weather[0].icon
      }

      // Determine weather effect based on conditions (only if auto mode)
      if (manualEffect.value === 'auto') {
        determineWeatherEffect(data.weather[0].main, data.main.temp, aqi)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      console.error('Weather fetch error:', e)
    } finally {
      loading.value = false
    }
  }

  const determineWeatherEffect = (condition: string, temp: number, aqi?: number) => {
    // Priority: AQI > Weather Condition > Temperature
    
    // Check air quality first (AQI > 3 means unhealthy)
    if (aqi && aqi >= 4) {
      weatherEffect.value = 'dust'
      return
    }

    // Check weather condition
    const conditionLower = condition.toLowerCase()
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      weatherEffect.value = 'rain'
    } else if (conditionLower.includes('snow')) {
      weatherEffect.value = 'snow'
    } else if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      weatherEffect.value = 'sun'
    } else if (temp < 15) {
      // Cold weather (below 15°C) - show snow effect
      weatherEffect.value = 'snow'
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog') || conditionLower.includes('haze')) {
      weatherEffect.value = 'dust'
    } else if (aqi && aqi >= 3) {
      // Moderate pollution
      weatherEffect.value = 'dust'
    } else {
      weatherEffect.value = 'none'
    }
  }

  // Set manual weather effect
  const setManualEffect = (effect: typeof manualEffect.value) => {
    manualEffect.value = effect
    if (effect === 'auto') {
      // Re-fetch weather to get auto effect
      if (weatherData.value) {
        determineWeatherEffect(
          weatherData.value.condition,
          weatherData.value.temp,
          weatherData.value.aqi
        )
      }
    } else {
      weatherEffect.value = effect as any
    }
  }

  // Fetch weather on mount
  onMounted(() => {
    fetchWeather()
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    onUnmounted(() => clearInterval(interval))
  })

  return {
    weatherData: readonly(weatherData),
    weatherEffect,
    loading: readonly(loading),
    error: readonly(error),
    fetchWeather,
    setManualEffect
  }
}
