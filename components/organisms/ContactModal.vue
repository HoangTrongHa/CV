<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="modelValue" 
        @click="$emit('update:modelValue', false)" 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div 
            v-if="modelValue" 
            @click.stop 
            class="bg-white dark:bg-[#0d1f17] rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-[#254632]"
          >
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ $t('footer.getInTouch') }}
              </h3>
              <button 
                @click="$emit('update:modelValue', false)" 
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <!-- Contact Details -->
            <div class="space-y-4">
              <!-- Phone -->
              <button 
                @click="copyToClipboard('0838584663', 'phone')"
                class="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-[#1a3426] transition-colors group relative"
              >
                <span class="material-symbols-outlined text-primary">phone</span>
                <div class="flex-1 text-left">
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('footer.phone') }}</p>
                  <p class="font-semibold text-gray-900 dark:text-white">0838584663</p>
                </div>
                <span v-if="copiedItem === 'phone'" class="material-symbols-outlined text-green-600 dark:text-green-400">check</span>
                <Transition name="fade">
                  <div 
                    v-if="copiedItem === 'phone'"
                    class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
                  >
                    {{ $t('footer.copied') }}
                  </div>
                </Transition>
              </button>

              <!-- Email -->
              <button 
                @click="copyToClipboard('ha9a1ltt@gmail.com', 'email')"
                class="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-[#1a3426] transition-colors group relative"
              >
                <span class="material-symbols-outlined text-primary">email</span>
                <div class="flex-1 text-left">
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('footer.email') }}</p>
                  <p class="font-semibold text-gray-900 dark:text-white">ha9a1ltt@gmail.com</p>
                </div>
                <span v-if="copiedItem === 'email'" class="material-symbols-outlined text-green-600 dark:text-green-400">check</span>
                <Transition name="fade">
                  <div 
                    v-if="copiedItem === 'email'"
                    class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
                  >
                    {{ $t('footer.copied') }}
                  </div>
                </Transition>
              </button>

              <!-- Facebook -->
              <a 
                href="https://www.facebook.com/HoangTrongHa2001/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-[#1a3426] transition-colors"
              >
                <span class="material-symbols-outlined text-primary">facebook</span>
                <div class="flex-1 text-left">
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('footer.facebook') }}</p>
                  <p class="font-semibold text-gray-900 dark:text-white">HoangTrongHa2001</p>
                </div>
                <span class="material-symbols-outlined text-gray-400">open_in_new</span>
              </a>

              <!-- LinkedIn -->
              <a 
                href="https://linkedin.com/in/ha-hoang-trong"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-[#1a3426] transition-colors"
              >
                <span class="material-symbols-outlined text-primary">work</span>
                <div class="flex-1 text-left">
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('footer.linkedin') }}</p>
                  <p class="font-semibold text-gray-900 dark:text-white">ha-hoang-trong</p>
                </div>
                <span class="material-symbols-outlined text-gray-400">open_in_new</span>
              </a>

              <!-- GitHub -->
              <a 
                href="https://github.com/HoangTrongHa"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-[#1a3426] transition-colors"
              >
                <span class="material-symbols-outlined text-primary">code</span>
                <div class="flex-1 text-left">
                  <p class="text-xs text-gray-500 dark:text-gray-400">GitHub</p>
                  <p class="font-semibold text-gray-900 dark:text-white">HoangTrongHa</p>
                </div>
                <span class="material-symbols-outlined text-gray-400">open_in_new</span>
              </a>
            </div>

            <!-- Close Button -->
            <button 
              @click="$emit('update:modelValue', false)" 
              class="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all"
            >
              {{ $t('footer.close') || 'Đóng' }}
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const copiedItem = ref<string | null>(null)

const copyToClipboard = async (text: string, item: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedItem.value = item
    setTimeout(() => {
      copiedItem.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
