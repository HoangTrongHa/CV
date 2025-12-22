<template>
  <div class="min-h-screen bg-white dark:bg-background-dark py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Custom Directives Demo
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Tập hợp các custom directives hữu ích trong Vue/Nuxt
        </p>
      </div>

      <!-- v-focus Demo -->
      <section class="mb-12 p-6 bg-gray-50 dark:bg-[#0d1f17] rounded-xl border border-gray-200 dark:border-[#254632]">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">center_focus_strong</span>
          v-focus
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Auto focus vào input khi component được mount hoặc khi condition thay đổi
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input sẽ auto focus khi load trang:
            </label>
            <input
              v-focus
              type="text"
              placeholder="This input is auto-focused"
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#254632] rounded-lg bg-white dark:bg-background-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Conditional focus (click button để focus):
            </label>
            <div class="flex gap-2">
              <input
                v-focus="shouldFocus"
                type="text"
                placeholder="Click button to focus this"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-[#254632] rounded-lg bg-white dark:bg-background-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                @click="shouldFocus = !shouldFocus"
                class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Toggle Focus
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-gray-100 dark:bg-background-dark rounded-lg">
          <code class="text-sm text-gray-800 dark:text-gray-200">
            &lt;input v-focus type="text" /&gt;<br>
            &lt;input v-focus="condition" type="text" /&gt;
          </code>
        </div>
      </section>

      <!-- v-click-outside Demo -->
      <section class="mb-12 p-6 bg-gray-50 dark:bg-[#0d1f17] rounded-xl border border-gray-200 dark:border-[#254632]">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">touch_app</span>
          v-click-outside
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Phát hiện khi user click bên ngoài element (hữu ích cho modals, dropdowns)
        </p>
        
        <div class="flex gap-4 flex-wrap">
          <div
            v-click-outside="handleClickOutside"
            class="p-6 bg-white dark:bg-background-dark border-2 border-primary rounded-xl cursor-default"
          >
            <p class="font-medium text-gray-900 dark:text-white mb-2">
              Click anywhere outside this box
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Clicks detected: {{ clickCount }}
            </p>
          </div>
        </div>

        <div class="mt-4 p-4 bg-gray-100 dark:bg-background-dark rounded-lg">
          <code class="text-sm text-gray-800 dark:text-gray-200">
            &lt;div v-click-outside="handleClickOutside"&gt;...&lt;/div&gt;
          </code>
        </div>
      </section>

      <!-- v-tooltip Demo -->
      <section class="mb-12 p-6 bg-gray-50 dark:bg-[#0d1f17] rounded-xl border border-gray-200 dark:border-[#254632]">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">info</span>
          v-tooltip
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Hiển thị tooltip khi hover vào element với nhiều vị trí khác nhau
        </p>
        
        <div class="flex gap-4 flex-wrap items-center justify-center py-8">
          <button
            v-tooltip="'Tooltip ở trên'"
            class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Top (default)
          </button>
          
          <button
            v-tooltip="{ text: 'Tooltip ở dưới', position: 'bottom' }"
            class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Bottom
          </button>
          
          <button
            v-tooltip="{ text: 'Tooltip bên trái', position: 'left' }"
            class="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Left
          </button>
          
          <button
            v-tooltip="{ text: 'Tooltip bên phải', position: 'right' }"
            class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Right
          </button>
        </div>

        <div class="mt-4 p-4 bg-gray-100 dark:bg-background-dark rounded-lg">
          <code class="text-sm text-gray-800 dark:text-gray-200">
            &lt;button v-tooltip="'Simple text'"&gt;Hover&lt;/button&gt;<br>
            &lt;button v-tooltip="{ text: 'Text', position: 'bottom' }"&gt;Hover&lt;/button&gt;
          </code>
        </div>
      </section>

      <!-- v-copy Demo -->
      <section class="mb-12 p-6 bg-gray-50 dark:bg-[#0d1f17] rounded-xl border border-gray-200 dark:border-[#254632]">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">content_copy</span>
          v-copy
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Copy text vào clipboard khi click vào element
        </p>
        
        <div class="space-y-4">
          <div
            v-copy="'Hello World! This text was copied.'"
            class="p-4 bg-white dark:bg-background-dark border border-gray-300 dark:border-[#254632] rounded-lg cursor-pointer hover:border-primary transition-colors"
          >
            <p class="text-gray-900 dark:text-white">
              📋 Click to copy: "Hello World! This text was copied."
            </p>
          </div>
          
          <div
            v-copy="{ text: copyText, success: handleCopySuccess }"
            class="p-4 bg-white dark:bg-background-dark border border-gray-300 dark:border-[#254632] rounded-lg cursor-pointer hover:border-primary transition-colors"
          >
            <p class="text-gray-900 dark:text-white">
              📋 Click to copy with callback: "{{ copyText }}"
            </p>
            <p v-if="copyMessage" class="text-sm text-primary mt-2">
              {{ copyMessage }}
            </p>
          </div>
        </div>

        <div class="mt-4 p-4 bg-gray-100 dark:bg-background-dark rounded-lg">
          <code class="text-sm text-gray-800 dark:text-gray-200">
            &lt;div v-copy="'Text to copy'"&gt;Click me&lt;/div&gt;<br>
            &lt;div v-copy="{ text: 'Text', success: handleSuccess }"&gt;Click&lt;/div&gt;
          </code>
        </div>
      </section>

      <!-- v-lazy-load Demo -->
      <section class="mb-12 p-6 bg-gray-50 dark:bg-[#0d1f17] rounded-xl border border-gray-200 dark:border-[#254632]">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">image</span>
          v-lazy-load
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Lazy load images với Intersection Observer (scroll down để xem hiệu ứng)
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="i in 6"
            :key="i"
            class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
          >
            <img
              v-lazy-load="`https://picsum.photos/600/400?random=${i}`"
              :alt="`Lazy loaded image ${i}`"
              class="w-full h-full object-cover lazy-loading"
            />
          </div>
        </div>

        <div class="mt-4 p-4 bg-gray-100 dark:bg-background-dark rounded-lg">
          <code class="text-sm text-gray-800 dark:text-gray-200">
            &lt;img v-lazy-load="'/path/to/image.jpg'" alt="Lazy" /&gt;<br>
            &lt;img v-lazy-load="{ src: '/image.jpg', placeholder: '/loading.gif' }" /&gt;
          </code>
        </div>
      </section>

      <!-- Back Button -->
      <div class="text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <span class="material-symbols-outlined">arrow_back</span>
          Về trang chủ
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const shouldFocus = ref(false)
const clickCount = ref(0)
const copyText = ref('Custom text with success callback!')
const copyMessage = ref('')

const handleClickOutside = () => {
  clickCount.value++
}

const handleCopySuccess = (text: string) => {
  copyMessage.value = `✓ Copied: "${text}"`
  setTimeout(() => {
    copyMessage.value = ''
  }, 3000)
}

useHead({
  title: 'Custom Directives Demo - Vue/Nuxt Examples'
})
</script>

<style scoped>
/* Lazy loading styles */
:deep(img.lazy-loading) {
  filter: blur(10px);
  transition: filter 0.3s ease-in-out;
}

:deep(img.lazy-loaded) {
  filter: blur(0);
}

:deep(img.lazy-error) {
  filter: grayscale(1);
}
</style>
