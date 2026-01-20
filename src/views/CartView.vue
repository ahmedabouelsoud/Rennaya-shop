<template>
  <div class="container py-5 mt-5">
    <h1 class="fw-bold mb-4">Shopping Cart</h1>

    <div v-if="cartItems.length === 0" class="alert alert-info py-5 text-center">
      <i class="bi bi-cart-x display-1 mb-3"></i>
      <h3>Your cart is empty</h3>
      <p class="mb-4">Looks like you haven't added anything to your cart yet.</p>
      <router-link to="/shop" class="btn btn-danger">Start Shopping</router-link>
    </div>

    <div v-else class="row g-5">
      <!-- Cart Items -->
      <div class="col-lg-8">
        <!-- Desktop Table -->
        <div class="card border-0 shadow-sm d-none d-md-block">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                  <tr>
                    <th scope="col" class="py-3 ps-4">Product</th>
                    <th scope="col" class="py-3">Price</th>
                    <th scope="col" class="py-3">Quantity</th>
                    <th scope="col" class="py-3 text-end pe-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartItems" :key="item.id">
                    <td class="ps-4">
                      <div class="d-flex align-items-center gap-3">
                        <img
                          :src="item.image"
                          class="rounded"
                          width="60"
                          height="60"
                          style="object-fit: cover"
                        />
                        <div>
                          <h6 class="mb-0 fw-bold">{{ item.name }}</h6>
                          <small class="text-muted">Size: {{ item.size }}</small>
                        </div>
                      </div>
                    </td>
                    <td>${{ item.price.toFixed(2) }}</td>
                    <td>
                      <div class="input-group input-group-sm" style="width: 100px">
                        <button
                          class="btn btn-outline-secondary"
                          @click="item.quantity > 1 ? item.quantity-- : null"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          class="form-control text-center"
                          :value="item.quantity"
                          readonly
                        />
                        <button class="btn btn-outline-secondary" @click="item.quantity++">
                          +
                        </button>
                      </div>
                    </td>
                    <td class="text-end pe-4 fw-bold">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Mobile Cards -->
        <div class="d-md-none">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="card border-0 shadow-sm mb-3 overflow-hidden"
          >
            <div class="card-body p-0">
              <div class="d-flex p-3 gap-3">
                <img
                  :src="item.image"
                  class="rounded"
                  width="100"
                  height="100"
                  style="object-fit: cover"
                />
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start">
                    <h6 class="fw-bold mb-1">{{ item.name }}</h6>
                    <button class="btn btn-sm text-danger p-0" title="Remove">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <p class="text-muted small mb-2">Size: {{ item.size }}</p>
                  <div class="d-flex justify-content-between align-items-center mt-auto">
                    <span class="fw-bold text-primary">${{ item.price.toFixed(2) }}</span>
                    <div class="input-group input-group-sm" style="width: 90px">
                      <button
                        class="btn btn-outline-secondary"
                        @click="item.quantity > 1 ? item.quantity-- : null"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        class="form-control text-center p-0"
                        :value="item.quantity"
                        readonly
                      />
                      <button class="btn btn-outline-secondary" @click="item.quantity++">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-light p-2 px-3 d-flex justify-content-between align-items-center">
                <span class="small text-muted">Subtotal</span>
                <span class="fw-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h4 class="fw-bold mb-4">Order Summary</h4>

            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Subtotal</span>
              <span class="fw-bold">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Shipping</span>
              <span class="text-success">Free</span>
            </div>
            <div class="d-flex justify-content-between mb-4">
              <span class="text-muted">Tax</span>
              <span>${{ (subtotal * 0.14).toFixed(2) }}</span>
            </div>

            <hr />

            <div class="d-flex justify-content-between mb-4">
              <span class="h5 fw-bold">Total</span>
              <span class="h5 fw-bold text-danger">${{ (subtotal * 1.14).toFixed(2) }}</span>
            </div>

            <button class="btn btn-dark w-100 py-3 fw-bold rounded-0">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock Cart Data - In a real app, this would come from Pinia/LocalStorage
const cartItems = ref([
  {
    id: 101,
    name: 'Wilson NBA Official Ball',
    price: 199.99,
    quantity: 1,
    size: 'Official',
    image:
      'https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 102,
    name: 'Pro Running Jersey',
    price: 45.0,
    quantity: 2,
    size: 'M',
    image:
      'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=200',
  },
])

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})
</script>
