<script setup>
import Navbar from '@/components/layout/TheNavbar.vue'
import Footer from '@/components/layout/TheFooter.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <main class="flex-grow-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Global styles are now managed in assets/base.css */
</style>
