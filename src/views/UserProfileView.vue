<template>
  <div class="min-vh-100 bg-light py-5">
    <div class="container py-4">
      <div class="row g-4">
        <!-- Sidebar -->
        <div class="col-lg-3">
          <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="card-body text-center p-4">
              <div class="position-relative d-inline-block mb-3">
                <div
                  class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto fs-1 fw-bold"
                  style="width: 80px; height: 80px"
                >
                  {{ userInitials }}
                </div>
              </div>
              <h5 class="fw-bold mb-1">{{ user?.displayName || 'User Name' }}</h5>
              <p class="text-muted small">{{ user?.email || 'user@example.com' }}</p>
              <div class="d-grid mt-3">
                <button class="btn btn-outline-primary rounded-pill btn-sm">Edit Profile</button>
              </div>
            </div>
            <div class="list-group list-group-flush border-top-0">
              <button
                class="list-group-item list-group-item-action border-0 py-3 px-4 d-flex align-items-center gap-3"
                :class="{ active: activeTab === 'dashboard' }"
                @click="activeTab = 'dashboard'"
              >
                <i class="bi bi-grid-fill"></i> Dashboard
              </button>
              <button
                class="list-group-item list-group-item-action border-0 py-3 px-4 d-flex align-items-center gap-3"
                :class="{ active: activeTab === 'orders' }"
                @click="activeTab = 'orders'"
              >
                <i class="bi bi-box-seam-fill"></i> My Orders
              </button>
              <button
                class="list-group-item list-group-item-action border-0 py-3 px-4 d-flex align-items-center gap-3"
                :class="{ active: activeTab === 'wishlist' }"
                @click="activeTab = 'wishlist'"
              >
                <i class="bi bi-heart-fill"></i> Wishlist
              </button>
              <button
                class="list-group-item list-group-item-action border-0 py-3 px-4 d-flex align-items-center gap-3 text-danger"
                @click="handleSignOut"
              >
                <i class="bi bi-box-arrow-right"></i> Sign Out
              </button>
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div class="col-lg-9">
          <!-- Dashboard Tab -->
          <div v-if="activeTab === 'dashboard'" class="d-flex flex-column gap-4">
            <div class="row g-4">
              <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                  <div class="d-flex align-items-center gap-3">
                    <div class="bg-primary-subtle p-3 rounded-circle text-primary">
                      <i class="bi bi-bag-check fs-4"></i>
                    </div>
                    <div>
                      <h4 class="fw-bold mb-0">12</h4>
                      <p class="text-muted mb-0 small">Total Orders</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                  <div class="d-flex align-items-center gap-3">
                    <div class="bg-success-subtle p-3 rounded-circle text-success">
                      <i class="bi bi-heart fs-4"></i>
                    </div>
                    <div>
                      <h4 class="fw-bold mb-0">5</h4>
                      <p class="text-muted mb-0 small">Wishlist Items</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                  <div class="d-flex align-items-center gap-3">
                    <div class="bg-warning-subtle p-3 rounded-circle text-warning">
                      <i class="bi bi-star fs-4"></i>
                    </div>
                    <div>
                      <h4 class="fw-bold mb-0">Gold</h4>
                      <p class="text-muted mb-0 small">Membership</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div class="card-header bg-white p-4 border-bottom">
                <h5 class="fw-bold mb-0">Recent Activity</h5>
              </div>
              <div class="card-body p-0">
                <div class="list-group list-group-flush">
                  <div
                    class="list-group-item p-4 border-bottom-0 border-light d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-light p-2 rounded">
                        <i class="bi bi-box text-muted"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-1">Order #12345 Delivered</h6>
                        <small class="text-muted">2 hours ago</small>
                      </div>
                    </div>
                    <span class="badge bg-success-subtle text-success rounded-pill">Completed</span>
                  </div>
                  <div
                    class="list-group-item p-4 border-bottom-0 border-light d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-light p-2 rounded">
                        <i class="bi bi-heart text-muted"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-1">Added "Running Shoes" to Wishlist</h6>
                        <small class="text-muted">Yesterday</small>
                      </div>
                    </div>
                    <span class="badge bg-primary-subtle text-primary rounded-pill">Saved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Orders Tab -->
          <div v-if="activeTab === 'orders'" class="d-flex flex-column gap-4">
            <div class="card border-0 shadow-sm rounded-4 p-4 text-center py-5">
              <i class="bi bi-box-seam fs-1 text-muted mb-3 opacity-50"></i>
              <h5>Order History</h5>
              <p class="text-muted">You haven't placed any orders yet.</p>
              <button class="btn btn-primary rounded-pill px-4 mt-2">Start Shopping</button>
            </div>
          </div>

          <!-- Wishlist Tab -->
          <div v-if="activeTab === 'wishlist'" class="d-flex flex-column gap-4">
            <h4 class="fw-bold">My Wishlist (5)</h4>
            <div class="row g-4">
              <div class="col-md-6" v-for="i in 2" :key="i">
                <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                  <div class="row g-0 h-100">
                    <div class="col-4">
                      <img
                        :src="`https://images.unsplash.com/photo-${['1542291026-7eec264c27ff', '1615615228002-890bb61cac6e'][i - 1]}?auto=format&fit=crop&w=200&q=80`"
                        class="img-fluid h-100 object-fit-cover"
                      />
                    </div>
                    <div class="col-8">
                      <div class="card-body h-100 d-flex flex-column justify-content-center">
                        <h6 class="fw-bold mb-1">Premium Product {{ i }}</h6>
                        <div class="text-primary fw-bold mb-3">$129.99</div>
                        <button class="btn btn-sm btn-outline-dark rounded-pill w-100">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)
const activeTab = ref('dashboard')

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    if (!currentUser) {
      router.push('/') // Redirect if not logged in
    }
  })
})

const userInitials = computed(() => {
  if (user.value && user.value.displayName) {
    return user.value.displayName.charAt(0).toUpperCase()
  }
  return 'U'
})

const handleSignOut = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.list-group-item.active {
  background-color: var(--bs-light);
  color: var(--bs-primary);
  border-left: 4px solid var(--bs-primary) !important;
  font-weight: 600;
}
.list-group-item:not(.active) {
  border-left: 4px solid transparent;
}
.bg-primary-subtle {
  background-color: rgba(220, 53, 69, 0.1) !important;
}
.text-primary {
  color: var(--bs-primary) !important;
}
</style>
