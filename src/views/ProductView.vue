<template>
  <div class="container py-5 mt-5">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
    </div>

    <div v-else-if="!product" class="text-center py-5">
      <h3>Product not found</h3>
      <router-link to="/shop" class="btn btn-dark mt-3">Back to Shop</router-link>
    </div>

    <div v-else class="row g-5">
      <!-- Product Images -->
      <div class="col-md-6">
        <div class="bg-light p-4 rounded text-center shadow-sm">
          <img
            :src="product.image || 'https://via.placeholder.com/500'"
            class="img-fluid"
            style="max-height: 500px; object-fit: contain"
          />
        </div>
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <div class="d-flex justify-content-between align-items-start">
          <h1 class="fw-bold display-5">{{ product.name }}</h1>
          <span v-if="product.discount > 0" class="badge bg-danger fs-6"
            >{{ product.discount }}% OFF</span
          >
        </div>

        <p class="text-muted text-uppercase mb-3">{{ product.Category || 'Uncategorized' }}</p>

        <div class="d-flex align-items-center gap-3 mb-4">
          <h2 class="fw-bold mb-0" :class="product.discount > 0 ? 'text-danger' : 'text-body'">
            ${{ product.newPrice ? product.newPrice.toFixed(2) : product.price.toFixed(2) }}
          </h2>
          <h4 v-if="product.discount > 0" class="text-muted text-decoration-line-through mb-0">
            ${{ product.price.toFixed(2) }}
          </h4>
        </div>

        <p class="lead mb-4">
          {{
            product.description ||
            'Experience premium quality and performance with this item. Designed for athletes and enthusiasts alike, it combines style, durability, and comfort for your everyday needs.'
          }}
        </p>

        <!-- Size Selector -->
        <div class="mb-4">
          <label class="fw-bold mb-2">Size</label>
          <div class="d-flex gap-2">
            <template v-for="size in sizes" :key="size">
              <input
                type="radio"
                class="btn-check"
                :name="'size-' + product.id"
                :id="'size-' + size"
                autocomplete="off"
                v-model="selectedSize"
                :value="size"
              />
              <label class="btn btn-outline-dark rounded-0 px-3" :for="'size-' + size">{{
                size
              }}</label>
            </template>
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="d-flex gap-3 mb-4">
          <div class="input-group" style="width: 140px">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="quantity > 1 ? quantity-- : null"
            >
              -
            </button>
            <input type="text" class="form-control text-center" v-model="quantity" readonly />
            <button class="btn btn-outline-secondary" type="button" @click="quantity++">+</button>
          </div>
          <button @click="addToCart" class="btn btn-danger btn-lg rounded-0 flex-grow-1">
            <i class="bi bi-cart-plus me-2"></i> Add to Cart
          </button>
        </div>

        <div v-if="toastMessage" class="alert alert-success mt-3">
          {{ toastMessage }}
        </div>

        <hr class="my-4" />

        <div class="small text-muted">
          <div class="mb-2"><i class="bi bi-shield-check me-2"></i> 100% Authentic Product</div>
          <div class="mb-2"><i class="bi bi-truck me-2"></i> Free Shipping on orders over $100</div>
          <div><i class="bi bi-arrow-return-left me-2"></i> 30 Day Return Policy</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const selectedSize = ref('M')
const sizes = ['S', 'M', 'L', 'XL']
const toastMessage = ref(null)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    try {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        // Basic price calculation logic if not pre-calculated
        const price = Number(data.price) || 0
        const discount = Number(data.discount) || 0
        const newPrice = discount > 0 ? price * (1 - discount / 100) : price

        product.value = {
          id: docSnap.id,
          ...data,
          price,
          discount,
          newPrice,
        }
      } else {
        throw new Error('Product not found in Firebase')
      }
    } catch (e) {
      console.error('Error fetching product from Firebase:', e)
    } finally {
      loading.value = false
    }
  }
})

const addToCart = () => {
  toastMessage.value = `Added ${quantity.value} x "${product.value.name}" (Size: ${selectedSize.value}) to cart!`
  // Here you would implement actual cart logic (Pinia, LocalStorage, or Firebase)
  setTimeout(() => (toastMessage.value = null), 3000)
}
</script>
