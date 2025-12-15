<template>
  <footer class="mt-12 mb-12" id="contact">
    <div class="bg-gradient-to-br from-[#1e3a29] to-background-dark border border-[#254632] rounded-[2rem] p-10 md:p-16 text-center">
      <h2 class="text-3xl md:text-4xl font-black text-white mb-6">
        {{ $t('footer.readyToWork') }}
      </h2>
      <p class="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
        {{ $t('footer.description') }}
      </p>
      
      <AppButton variant="primary" size="lg" @click="showContactModal = true">
        {{ $t('footer.contactMe') }}
      </AppButton>

      <!-- Contact Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div 
            v-if="showContactModal" 
            class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            @click.self="showContactModal = false"
          >
            <div class="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              <button 
                @click="showContactModal = false"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <AppIcon name="close" size="24px" />
              </button>

              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {{ $t('footer.getInTouch') }}
              </h3>

              <div class="space-y-4">
                <!-- Phone -->
                <button 
                  @click="copyToClipboard('0838584663', 'phone')"
                  class="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
                >
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <AppIcon :name="copiedItem === 'phone' ? 'check' : 'phone'" size="24px" class="text-primary" />
                  </div>
                  <div class="flex-1 text-left">
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('footer.phone') }}</p>
                    <p class="font-semibold text-slate-900 dark:text-white">0838584663</p>
                  </div>
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
                  class="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
                >
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <AppIcon :name="copiedItem === 'email' ? 'check' : 'email'" size="24px" class="text-primary" />
                  </div>
                  <div class="flex-1 text-left">
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('footer.email') }}</p>
                    <p class="font-semibold text-slate-900 dark:text-white">ha9a1ltt@gmail.com</p>
                  </div>
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
                  class="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <AppIcon name="facebook" size="24px" class="text-primary" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('footer.facebook') }}</p>
                    <p class="font-semibold text-slate-900 dark:text-white">HoangTrongHa2001</p>
                  </div>
                </a>

                <!-- LinkedIn -->
                <a 
                  href="https://linkedin.com/in/ha-hoang-trong"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <AppIcon name="work" size="24px" class="text-primary" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('footer.linkedin') }}</p>
                    <p class="font-semibold text-slate-900 dark:text-white">ha-hoang-trong</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
      
      <div class="mt-12 pt-8 border-t border-[#254632] flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {{ currentYear }} Ha Hoang Trong. {{ $t('footer.copyright') }}.</p>
        <div class="flex gap-4 mt-4 md:mt-0">

        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const showContactModal = ref(false)
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white,
.modal-enter-active .dark\:bg-surface-dark,
.modal-leave-active .dark\:bg-surface-dark {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-enter-from .dark\:bg-surface-dark {
  transform: scale(0.9);
}

.modal-leave-to .bg-white,
.modal-leave-to .dark\:bg-surface-dark {
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
