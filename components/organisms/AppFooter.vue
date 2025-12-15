<template>
  <footer class="mt-12 mb-12" id="contact">
    <div class="bg-gradient-to-br from-[#1e3a29] to-background-dark border border-[#254632] rounded-[2rem] p-10 md:p-16 text-center">
      <h2 class="text-3xl md:text-4xl font-black text-white mb-6">
        Ready to work together?
      </h2>
      <p class="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
        I'm currently available for freelance projects and open to full-time opportunities. Let's create something amazing.
      </p>
      
      <AppButton variant="primary" size="lg" @click="handleContact">
        Contact Me
      </AppButton>
      
      <div class="mt-12 pt-8 border-t border-[#254632] flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {{ currentYear }} Ha Hoang Trong. All rights reserved.</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const handleContact = () => {
  // Handle contact action
}
</script>
