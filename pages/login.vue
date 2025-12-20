<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-4">
          <span class="material-symbols-outlined text-3xl">lock</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ $t('login.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('login.subtitle') }}
        </p>
      </div>

      <!-- Login Form -->
      <div class="bg-white dark:bg-[#0d1f17] rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-[#254632]">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('login.username') }}
            </label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                person
              </span>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                required
                class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-[#254632] bg-white dark:bg-background-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="$t('login.usernamePlaceholder')"
                :disabled="loading"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('login.password') }}
            </label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                key
              </span>
              <input
                id="password"
                v-model="credentials.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-[#254632] bg-white dark:bg-background-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                :placeholder="$t('login.passwordPlaceholder')"
                :disabled="loading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                :disabled="loading"
              >
                <span class="material-symbols-outlined">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <span class="material-symbols-outlined text-red-600 dark:text-red-400 text-lg">error</span>
            <p class="text-sm text-red-700 dark:text-red-300">{{ $t('login.error') }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">{{ $t('login.loginButton') }}</span>
            <span v-else class="flex items-center gap-2">
              <span class="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
              {{ $t('login.processing') }}
            </span>
          </button>
        </form>

        <!-- Contact Info -->
        <div class="mt-6 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
          <p class="text-sm text-gray-700 dark:text-gray-300 text-center">
            {{ $t('login.contactWith') }} <button @click="showContactPopup = true" class="font-semibold text-primary hover:text-primary/80 underline transition-colors">Hoàng Trọng Hà</button>
          </p>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-6">
        <NuxtLink to="/" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors inline-flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          {{ $t('login.backToHome') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Contact Modal -->
    <ContactModal v-model="showContactPopup" />
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth()

const credentials = ref({
  username: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const showContactPopup = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800))

  const success = login(credentials.value.username, credentials.value.password)

  if (success) {
    navigateTo('/interviews')
  } else {
    loading.value = false
  }
}

// Redirect if already authenticated
onMounted(() => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated.value) {
    navigateTo('/interviews')
  }
})
</script>
