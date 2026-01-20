<template>
  <div class="home-view">
    <!-- Hero Section -->
    <header class="hero d-flex align-items-center text-white position-relative">
      <div class="overlay"></div>
      <div class="container position-relative z-2">
        <div class="row">
          <div class="col-lg-7">
            <span
              class="badge bg-primary px-3 py-2 mb-3 rounded-pill text-uppercase tracking-wider fw-bold"
              >New Collection 2024</span
            >
            <h1 class="display-2 fw-bold font-heading mb-3 lh-1 text-white">
              PUSH YOUR <span class="text-primary-gradient">LIMITS</span>
            </h1>
            <p class="lead mb-4 text-light opacity-75 fs-4" style="max-width: 600px">
              Discover our latest collection of premium sports equipment and apparel designed to
              elevate your performance.
            </p>
            <div class="d-flex gap-3">
              <router-link
                to="/shop"
                class="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-lg hover-lift"
              >
                SHOP NOW
              </router-link>
              <button
                class="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold hover-bg-light text-hover-dark"
              >
                EXPLORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section class="py-5 bg-card border-bottom">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3 p-3 feature-card rounded-3">
              <div
                class="icon-box bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              >
                <i class="bi bi-truck fs-4"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1 font-heading">Free Shipping</h5>
                <p class="text-muted small mb-0">On all orders over $50</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3 p-3 feature-card rounded-3">
              <div
                class="icon-box bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              >
                <i class="bi bi-headset fs-4"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1 font-heading">24/7 Support</h5>
                <p class="text-muted small mb-0">Expert assistance anytime</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3 p-3 feature-card rounded-3">
              <div
                class="icon-box bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              >
                <i class="bi bi-shield-check fs-4"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1 font-heading">Money Back</h5>
                <p class="text-muted small mb-0">30-day guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-5 bg-light-alt">
      <div class="container py-lg-5">
        <div class="text-center mb-5">
          <span class="text-primary fw-bold text-uppercase tracking-wider small">Categories</span>
          <h2 class="fw-bold font-heading display-5 mt-2">Shop By Category</h2>
          <div class="bg-primary mx-auto mt-3 rounded-pill" style="width: 60px; height: 4px"></div>
        </div>
        <div class="row g-4">
          <div class="col-md-4" v-for="cat in categories" :key="cat.title">
            <div class="category-card position-relative overflow-hidden rounded-4 shadow-sm group">
              <img
                :src="cat.img"
                class="w-100 h-100 object-fit-cover transition-transform"
                style="height: 350px"
              />
              <div class="overlay-gradient position-absolute inset-0"></div>
              <div class="position-absolute bottom-0 start-0 p-4 w-100 text-white z-2">
                <h3 class="fw-bold font-heading mb-1">{{ cat.title }}</h3>
                <p class="opacity-75 small mb-3">{{ cat.count || 'View Products' }}</p>
                <button class="btn btn-light rounded-pill btn-sm px-4 fw-bold">Browse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="py-5 bg-card">
      <div class="container py-lg-5">
        <div class="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 class="fw-bold font-heading display-6 mb-0">Trending Now</h2>
            <p class="text-muted mt-2 mb-0">Top picks for this week</p>
          </div>
          <router-link to="/shop" class="btn btn-outline-dark rounded-pill px-4"
            >View All</router-link
          >
        </div>

        <div class="row g-4">
          <div class="col-md-3 col-sm-6" v-for="i in 4" :key="i">
            <!-- Placeholder Product Card purely for visual mock -->
            <div
              class="card h-100 border-0 shadow-hover transition-all rounded-4 overflow-hidden bg-body"
            >
              <div class="position-relative bg-light p-4 text-center">
                <span
                  v-if="i === 1"
                  class="badge bg-danger position-absolute top-0 start-0 m-3 rounded-pill"
                  >HOT</span
                >
                <img
                  :src="`https://images.unsplash.com/photo-${['1542291026-7eec264c27ff', '1615615228002-890bb61cac6e', '1606107557195-0e29a4b5b4aa', '1515955656352-a1fa3ffcd111'][i - 1]}?auto=format&fit=crop&w=400&q=80`"
                  class="img-fluid rounded-3 w-100"
                  style="height: 180px; object-fit: cover"
                />
              </div>
              <div class="card-body">
                <small class="text-muted text-uppercase tracking-wider">Equipment</small>
                <h6 class="fw-bold mt-1 text-truncate">Premium Sport Gear Item {{ i }}</h6>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span class="fw-bold text-primary fs-5">${{ (19.99 * i).toFixed(2) }}</span>
                  <button
                    class="btn btn-sm btn-light rounded-circle shadow-sm"
                    style="width: 32px; height: 32px"
                  >
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Promo Banner -->
    <section class="py-5 position-relative overflow-hidden bg-dark text-white">
      <div class="container position-relative z-2 py-5">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h2 class="display-4 fw-bold font-heading mb-4">WINTER SALE IS HERE</h2>
            <p class="lead mb-4 opacity-75">
              Get up to 50% off on selected sportswear and equipment. Limited time offer.
            </p>
            <div class="d-flex gap-3">
              <div class="text-center bg-white text-dark rounded-3 p-3" style="min-width: 80px">
                <div class="fw-bold fs-3 lh-1">02</div>
                <div class="small text-uppercase fw-bold opacity-75">Days</div>
              </div>
              <div class="text-center bg-white text-dark rounded-3 p-3" style="min-width: 80px">
                <div class="fw-bold fs-3 lh-1">14</div>
                <div class="small text-uppercase fw-bold opacity-75">Hours</div>
              </div>
              <div class="text-center bg-white text-dark rounded-3 p-3" style="min-width: 80px">
                <div class="fw-bold fs-3 lh-1">35</div>
                <div class="small text-uppercase fw-bold opacity-75">Mins</div>
              </div>
            </div>
            <button class="btn btn-primary rounded-pill px-5 btn-lg mt-5 fw-bold shadow-lg">
              Grab Deal
            </button>
          </div>
          <div class="col-lg-6 mt-5 mt-lg-0 text-center">
            <img
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80"
              class="img-fluid rounded-4 shadow-lg rotate-card"
              style="transform: rotate(-3deg); border: 10px solid rgba(255, 255, 255, 0.1)"
            />
          </div>
        </div>
      </div>
      <!-- Background pattern -->
      <div
        class="position-absolute top-0 start-0 w-100 h-100 opacity-10"
        style="background: radial-gradient(circle at center, #ffffff 0%, transparent 70%)"
      ></div>
    </section>

    <!-- Newsletter -->
    <section class="py-5 bg-card">
      <div class="container py-lg-5 text-center">
        <div class="col-lg-8 mx-auto">
          <i class="bi bi-envelope-paper fs-1 text-primary mb-3 d-block"></i>
          <h2 class="fw-bold font-heading mb-3">Join Our Newsletter</h2>
          <p class="text-muted mb-4">
            Subscribe to our newsletter and get 10% off your first purchase plus latest news.
          </p>
          <div class="input-group input-group-lg shadow-sm">
            <input
              type="email"
              class="form-control border-0 bg-input"
              placeholder="Your email address"
            />
            <button class="btn btn-dark px-5 fw-bold">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const categories = [
  {
    title: 'Sports Equipment',
    img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800',
    count: '120+ Items',
  },
  {
    title: 'Swim Wear',
    img: 'https://plus.unsplash.com/premium_photo-1713184646605-ae68c76bcbac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHN3aW1taW5nfGVufDB8fDB8fHww',
    count: '45+ Items',
  },
  {
    title: 'Hiking Shoes',
    img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800',
    count: '32+ Items',
  },
]
</script>

<style scoped>
/* Hero */
.hero {
  min-height: 90vh;
  /* Neutral background - Gym Ropes/Equipment */
  background: url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1920&auto=format&fit=crop')
    no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}
.hero-title {
  color: #ffffff !important;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

@media (max-width: 991.98px) {
  .hero {
    min-height: 80vh;
    text-align: center;
  }
  .hero .d-flex {
    justify-content: center;
  }
  .hero .lead {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 3.5rem;
  }
  .hero .lead {
    font-size: 1.1rem;
  }
}

@media (max-width: 575.98px) {
  .hero h1 {
    font-size: 2.8rem;
  }
  .hero .d-flex {
    flex-direction: column;
    gap: 1rem !important;
  }
  .hero .btn {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .hero h1 {
    font-size: 2.2rem;
  }
}
.text-primary-gradient {
  background: linear-gradient(45deg, var(--bs-primary), #ff9a9e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Features */
.icon-box {
  width: 60px;
  height: 60px;
}
.bg-card {
  background-color: var(--card-bg);
}
.bg-light-alt {
  background-color: var(--bs-light);
}

/* Categories */
.category-card img {
  transition: transform 0.5s ease;
}
.category-card:hover img {
  transform: scale(1.1);
}
.overlay-gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

/* Utilities */
.tracking-wider {
  letter-spacing: 2px;
}
.hover-lift {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}

.bg-input {
  background-color: var(--input-bg);
}

[data-theme='dark'] .text-hover-dark:hover {
  color: #000 !important;
}
</style>
