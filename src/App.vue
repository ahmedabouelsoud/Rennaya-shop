<script setup>
import Navbar from '@/components/layout/TheNavbar.vue';
import Footer from '@/components/layout/TheFooter.vue';
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
Global accent color override
:root {
  --bs-primary: #dc3545; /* Red color from screenshots */
  --bs-btn-primary-bg: #dc3545;
  --bs-btn-primary-border-color: #dc3545;
}
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
</style>
