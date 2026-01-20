<template>
  <div class="min-vh-100 bg-light py-5 position-relative">
    <Transition name="fade">
      <div v-if="toastMessage" class="toast-notification">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-check-circle-fill text-success"></i>
          <span>{{ toastMessage }}</span>
        </div>
      </div>
    </Transition>

    <div
      class="text-center mb-5 hero-shop text-white d-flex align-items-center justify-content-center position-relative overflow-hidden"
    >
      <div class="position-absolute top-0 start-0 w-100 h-100 overlay-dark"></div>
      <div class="position-relative z-2">
        <span
          class="badge bg-white text-dark px-3 py-2 rounded-pill text-uppercase fw-bold mb-3 tracking-wider"
          >New Arrivals</span
        >
        <h1 class="fw-bold display-3 font-heading text-white">Shop Collection</h1>
        <p class="lead opacity-75">Explore the latest gear for your journey</p>
      </div>
    </div>

    <div class="container">
      <div class="row g-4">
        <!-- Sidebar Filter -->
        <aside class="col-lg-3">
          <div
            class="card border-0 shadow-sm p-4 sticky-top rounded-4 bg-card"
            style="top: 100px; z-index: 10"
          >
            <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
              <h5 class="fw-bold font-heading mb-0">Filters</h5>
              <i class="bi bi-sliders fs-5 text-primary"></i>
            </div>

            <h6 class="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Categories</h6>
            <div class="form-check custom-checkbox mb-2" v-for="cat in categories" :key="cat">
              <input
                class="form-check-input shadow-none"
                type="checkbox"
                :id="cat"
                :value="cat"
                v-model="selectedCategories"
              />
              <label class="form-check-label text-capitalize cursor-pointer" :for="cat">{{
                cat
              }}</label>
            </div>

            <h6 class="fw-bold mt-4 mb-3 text-uppercase small tracking-wider text-muted">
              Price Range
            </h6>
            <div class="px-1">
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-muted fw-bold">$0</span>
                <span class="fw-bold text-primary">${{ maxPrice }}</span>
              </div>
              <input
                type="range"
                class="form-range custom-range"
                min="0"
                max="1000"
                step="10"
                v-model.number="maxPrice"
              />
            </div>

            <h6 class="fw-bold mt-4 mb-3 text-uppercase small tracking-wider text-muted">
              Popular Tags
            </h6>
            <div class="d-flex flex-wrap gap-2">
              <span
                class="badge rounded-pill bg-light text-body border tag-hover px-3 py-2 fw-normal"
                v-for="tag in ['Sports', 'Gym', 'Indoor', 'Outdoor', 'Training']"
                :key="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <main class="col-lg-9">
          <!-- Toolbar -->
          <div
            class="d-flex flex-wrap justify-content-between align-items-center mb-4 bg-card p-3 rounded-4 shadow-sm border-0"
          >
            <div class="d-flex align-items-center gap-3">
              <span class="text-muted small"
                >Showing <strong>{{ filteredProducts.length }}</strong> results</span
              >

              <!-- Search Input -->
              <div class="position-relative d-none d-md-block" style="min-width: 250px">
                <input
                  type="text"
                  class="form-control border-0 bg-light rounded-pill ps-5"
                  placeholder="Search products..."
                  v-model="searchQuery"
                />
                <i
                  class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                ></i>
              </div>
            </div>

            <div class="d-flex align-items-center gap-3">
              <!-- Mobile Search Toggle or just show it stacked? Let's make it simple for now -->
              <div class="d-md-none w-100 mb-2">
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control border-0 bg-light rounded-pill ps-5 w-100"
                    placeholder="Search..."
                    v-model="searchQuery"
                  />
                  <i
                    class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  ></i>
                </div>
              </div>

              <span class="text-muted small">Sort by:</span>
              <select
                class="form-select w-auto border-0 bg-transparent shadow-none fw-bold text-body"
                v-model="sortBy"
                style="cursor: pointer"
              >
                <option value="default">Newest Items</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2 text-muted animate-pulse">Loading amazing products...</p>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="filteredProducts.length === 0"
            class="text-center py-5 rounded-4 bg-card shadow-sm"
          >
            <div class="mb-3 text-muted opacity-50">
              <i class="bi bi-basket3 fs-1"></i>
            </div>
            <h4 class="fw-bold">No products found</h4>
            <p class="text-muted">Try adjusting your filters or search criteria.</p>
            <button class="btn btn-outline-primary rounded-pill px-4 mt-2" @click="resetFilters">
              Clear Filters
            </button>
          </div>

          <!-- Products Grid -->
          <div v-else class="row g-4">
            <div class="col-md-4 col-sm-6" v-for="product in filteredProducts" :key="product.id">
              <div
                class="card h-100 border-0 shadow-hover product-card bg-card rounded-4 overflow-hidden group"
              >
                <!-- Badges -->
                <div class="position-absolute top-0 start-0 m-3 z-2 d-flex flex-column gap-2">
                  <span v-if="product.discount > 0" class="badge bg-danger rounded-pill shadow-sm"
                    >{{ product.discount }}% OFF</span
                  >
                  <span
                    v-else-if="product.price < 100"
                    class="badge bg-success rounded-pill shadow-sm"
                    >SALE</span
                  >
                </div>

                <!-- Clickable Image Area -->
                <router-link :to="'/product/' + product.id" class="text-decoration-none text-body">
                  <div
                    class="image-container bg-light d-flex align-items-center justify-content-center p-4 position-relative"
                    style="height: 260px"
                  >
                    <img
                      :src="product.image || 'https://via.placeholder.com/200'"
                      class="img-fluid product-img transition-transform"
                      alt="product"
                    />

                    <!-- Overlay Actions -->
                    <button
                      class="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-3 p-2 like-btn opacity-0 group-hover-opacity"
                    >
                      <i class="bi bi-heart"></i>
                    </button>
                  </div>

                  <div class="card-body p-3 text-start">
                    <small
                      class="text-muted text-uppercase fw-bold mb-1 d-block tracking-wider"
                      style="font-size: 0.65rem"
                    >
                      {{ formatCategory(product.Category) }}
                    </small>
                    <h6 class="fw-bold mb-2 text-truncate font-heading">{{ product.name }}</h6>

                    <div class="d-flex justify-content-between align-items-center mt-3">
                      <div class="d-flex flex-column lh-1">
                        <span
                          v-if="product.discount > 0"
                          class="text-muted text-decoration-line-through small mb-1"
                        >
                          ${{ product.price.toFixed(2) }}
                        </span>
                        <span class="fw-bold fs-5 text-primary">
                          ${{ (product.newPrice ? product.newPrice : product.price).toFixed(2) }}
                        </span>
                      </div>
                      <button
                        @click.prevent="addToCart(product)"
                        class="btn btn-primary rounded-circle shadow-sm btn-icon hover-scale"
                      >
                        <i class="bi bi-plus-lg text-white"></i>
                      </button>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const products = ref([])
const loading = ref(true)
const toastMessage = ref(null)

const categories = ref([])
const selectedCategories = ref([])
const searchQuery = ref('')
const maxPrice = ref(1000)
const sortBy = ref('default')

import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
  }
  fetchProducts()
})

const formatCategory = (cat) => {
  if (!cat) return ''
  return cat.charAt(0).toUpperCase() + cat.slice(1)
}

const calculatePriceWithDiscount = (price, discount) => {
  const p = Number(price) || 0
  const d = Number(discount) || 0
  return d > 0 ? p * (1 - d / 100) : p
}

const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    let loadedProducts = []

    if (!querySnapshot.empty) {
      loadedProducts = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        const price = Number(data.price) || 0
        const discount = Number(data.discount) || 0

        return {
          id: doc.id,
          ...data,
          price,
          discount,
          newPrice: data.newPrice
            ? Number(data.newPrice)
            : calculatePriceWithDiscount(price, discount),
          Category: data.Category ? String(data.Category).toLowerCase() : 'uncategorized',
        }
      })
    } else {
      console.warn('Firestore is empty')
    }

    products.value = loadedProducts
    categories.value = [...new Set(loadedProducts.map((p) => p.Category))]
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

const filteredProducts = computed(() => {
  let result = products.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        (item.Category && item.Category.toLowerCase().includes(query)),
    )
  }

  if (selectedCategories.value.length > 0) {
    result = result.filter((item) => selectedCategories.value.includes(item.Category))
  }

  result = result.filter((item) => item.newPrice <= maxPrice.value)

  if (sortBy.value === 'low-high') {
    result = [...result].sort((a, b) => a.newPrice - b.newPrice)
  } else if (sortBy.value === 'high-low') {
    result = [...result].sort((a, b) => b.newPrice - a.newPrice)
  }

  return result
})

const addToCart = (product) => {
  toastMessage.value = `Added "${product.name}" to cart!`
  setTimeout(() => {
    toastMessage.value = null
  }, 3000)
}

const resetFilters = () => {
  maxPrice.value = 1000
  selectedCategories.value = []
  searchQuery.value = ''
}
</script>

<style scoped>
/* Hero */
.hero-shop {
  background:
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1920&auto=format&fit=crop')
      center/cover !important;
  height: 300px !important;
  background-attachment: fixed !important;
}

.overlay-dark {
  background: rgba(0, 0, 0, 0.5);
}

.bg-card {
  background-color: var(--card-bg);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.shadow-hover {
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.shadow-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.product-img {
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}
.shadow-hover:hover .product-img {
  transform: scale(1.1);
}

.group-hover-opacity {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}
.shadow-hover:hover .group-hover-opacity {
  opacity: 1;
  transform: translateY(0);
}

.hover-scale {
  transition: transform 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.1);
}

.btn-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.tracking-wider {
  letter-spacing: 1.5px;
}
.font-heading {
  font-family: var(--font-heading);
}

/* Sidebar & Form */
.form-check-input:checked {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

.tag-hover {
  transition: all 0.2s ease;
  cursor: pointer;
}
.tag-hover:hover {
  background-color: var(--bs-primary) !important;
  color: #fff !important;
  border-color: var(--bs-primary) !important;
}

/* Toast */
.toast-notification {
  position: fixed;
  top: 100px;
  right: 20px;
  background: var(--card-bg);
  color: var(--body-text);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  border-left: 5px solid #198754;
  backdrop-filter: blur(10px);
}
[data-theme='dark'] .toast-notification {
  border: 1px solid var(--border-color);
  border-left: 5px solid #198754;
}
</style>
