<template>
  <div>
    <header class="hero d-flex align-items-center text-white" style="background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&auto=format&fit=crop');">
      <div class="container">
        <div class="col-md-6">
          <span class="text-danger fw-bold letter-spacing-2">LIMITED EDITION</span>
          <h1 class="display-3 fw-bolder my-3">READY SET AND GO</h1>
          <p class="lead mb-4 text-light opacity-75">اكتشف مجموعتنا الجديدة من الملابس والمعدات الرياضية.</p>
          <button class="btn btn-danger btn-lg rounded-0 px-4 me-3">SHOP NOW</button>
          <button class="btn btn-outline-light btn-lg rounded-0 px-4">READ MORE</button>
        </div>
      </div>
    </header>

    <section class="py-5 container">
      <div class="text-center mb-5">
        <h2 class="fw-bold">OUR PRODUCT CATEGORIES</h2>
        <div class="bg-danger mx-auto" style="width: 50px; height: 3px;"></div>
      </div>
      <div class="row g-4">
        <div class="col-md-4" v-for="cat in categories" :key="cat.title">
          <div class="position-relative overflow-hidden group">
            <img :src="cat.img" class="w-100" style="height: 250px; object-fit: cover; filter: brightness(0.7);">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white w-100">
              <h4 class="fw-bold text-uppercase">{{ cat.title }}</h4>
              <button class="btn btn-danger btn-sm mt-2">Browse</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const categories = [
  { title: 'Shop Sports Equipment', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500' },
  { title: 'Shop Swim Wear', img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=500' },
  { title: 'Shop Hiking Shoes', img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=500' }
];
</script>

<style scoped>
.hero { height: 85vh; background-size: cover; background-position: center; }
.letter-spacing-2 { letter-spacing: 2px; }
</style>
