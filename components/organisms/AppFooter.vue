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
      <ContactModal v-model="showContactModal" />
      
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
