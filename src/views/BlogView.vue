<template>
  <div class="container py-5 mt-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold display-4">Our Blog</h1>
      <p class="lead text-muted">Latest news, tips, and stories from the world of sports.</p>
    </div>

    <div class="row g-4">
      <div v-for="post in posts" :key="post.id" class="col-md-4">
        <div class="card h-100 border-0 shadow-sm hover-card">
          <div class="overflow-hidden" style="height: 200px">
            <img :src="post.image" class="card-img-top h-100 w-100" style="object-fit: cover" />
          </div>
          <div class="card-body d-flex flex-column">
            <small class="text-danger fw-bold text-uppercase mb-2">{{ post.category }}</small>
            <h5 class="card-title fw-bold mb-3">{{ post.title }}</h5>
            <p class="card-text text-muted flex-grow-1">{{ post.excerpt }}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="text-muted small"><i class="bi bi-clock me-1"></i> {{ post.date }}</span>
              <a href="#" class="btn btn-link text-danger text-decoration-none fw-bold p-0"
                >Read More &rarr;</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Running Shoes',
    excerpt:
      'Finding the perfect pair of running shoes can be tricky. Here is what you need to know before buying.',
    category: 'Running',
    date: 'Oct 12, 2024',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 2,
    title: 'Strength Training 101',
    excerpt: 'Start your strength training journey with these fundamental exercises for beginners.',
    category: 'Training',
    date: 'Oct 15, 2024',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 3,
    title: 'Nutrition Tips for Athletes',
    excerpt:
      'Fuel your body right with these essential nutrition tips designed for peak performance.',
    category: 'Health',
    date: 'Oct 20, 2024',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500',
  },
]
</script>

<style scoped>
.hover-card {
  transition: transform 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-5px);
}
.card-img-top {
  transition: transform 0.5s ease;
}
.hover-card:hover .card-img-top {
  transform: scale(1.05);
}
</style>
