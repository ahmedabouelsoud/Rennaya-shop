<template>
  <div class="top-bar bg-dark text-white py-2 small d-none d-lg-block">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-3">
        <span><i class="bi bi-envelope me-2"></i>support@rennaya.com</span>
        <span><i class="bi bi-telephone me-2"></i>+1 234 567 890</span>
      </div>
      <div class="d-flex align-items-center gap-3">
        <span>Free Shipping on Orders Over $50</span>
        <div class="vr bg-secondary"></div>
        <a href="#" class="text-white text-decoration-none"><i class="bi bi-facebook"></i></a>
        <a href="#" class="text-white text-decoration-none"><i class="bi bi-instagram"></i></a>
        <a href="#" class="text-white text-decoration-none"><i class="bi bi-twitter-x"></i></a>
      </div>
    </div>
  </div>

  <nav
    class="navbar navbar-expand-lg navbar-glass sticky-top py-3 transition-all"
    :class="{ 'scrolled shadow-sm': isScrolled }"
  >
    <div class="container">
      <router-link
        class="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2"
        to="/"
        @click="closeNavbar"
      >
        <span class="text-dark font-heading tracking-tight">RENNAYA</span>
        <span class="text-primary">SHOP</span>
      </router-link>

      <button
        class="navbar-toggler border-0 shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div class="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold text-uppercase gap-lg-4">
          <li class="nav-item">
            <router-link class="nav-link hover-underline" to="/" @click="closeNavbar"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link hover-underline" to="/shop" @click="closeNavbar"
              >Shop</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link hover-underline" to="/about" @click="closeNavbar"
              >About</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link hover-underline" to="/blog" @click="closeNavbar"
              >Blog</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link hover-underline" to="/contact" @click="closeNavbar"
              >Contact</router-link
            >
          </li>
        </ul>

        <div
          class="navbar-actions d-flex align-items-center gap-2 gap-lg-3 mt-3 mt-lg-0 pt-3 pt-lg-0 border-lg-0"
        >
          <button
            @click="toggleTheme"
            class="action-btn btn btn-link text-body p-2 rounded-circle hover-bg-light transition-all"
            title="Toggle Theme"
          >
            <i class="bi fs-5" :class="theme === 'light' ? 'bi-moon-stars' : 'bi-sun-fill'"></i>
          </button>

          <router-link
            to="/shop"
            class="action-btn position-relative text-decoration-none p-2 rounded-circle hover-bg-light transition-all"
            @click="closeNavbar"
          >
            <i
              class="bi bi-search fs-5 cursor-pointer text-body hover-text-primary transition-all"
            ></i>
          </router-link>

          <router-link
            to="/cart"
            class="action-btn position-relative cursor-pointer text-body hover-text-primary transition-all p-2 rounded-circle hover-bg-light"
            @click="closeNavbar"
          >
            <i class="bi bi-bag fs-5"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary border border-2 border-white"
              style="font-size: 0.6rem; padding: 0.25em 0.5em"
              >2</span
            >
          </router-link>

          <button
            v-if="!user"
            @click="signIn"
            class="btn btn-sm btn-dark px-4 rounded-pill fw-bold ms-lg-2"
          >
            Login
          </button>
          <div v-else class="dropdown ms-lg-2">
            <a
              href="#"
              class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="user.photoURL"
                alt="mdo"
                width="32"
                height="32"
                class="rounded-circle border border-2 border-secondary"
              />
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2">
              <li class="px-3 py-2 border-bottom">
                <div class="fw-bold small text-truncate" style="max-width: 150px">
                  {{ user.displayName }}
                </div>
                <div class="text-muted" style="font-size: 0.75rem">{{ user.email }}</div>
              </li>
              <li><div class="dropdown-header">Account</div></li>
              <li>
                <router-link
                  to="/profile"
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click="closeNavbar"
                >
                  <i class="bi bi-person"></i> Profile
                </router-link>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-2"
                  href="#"
                  @click="closeNavbar"
                  ><i class="bi bi-receipt"></i> Orders</a
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center gap-2 text-danger"
                  @click="logout"
                  href="#"
                  ><i class="bi bi-box-arrow-right"></i> Sign out</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { auth, provider } from '../../firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

const user = ref(null)
const theme = ref('light')
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })

  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'light'
  theme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)

  // Scroll logic
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}

const signIn = async () => {
  try {
    await signInWithPopup(auth, provider)
  } catch (e) {
    console.error(e)
  }
}

const logout = async () => {
  await signOut(auth)
}

const closeNavbar = () => {
  const navbarCollapse = document.getElementById('navbarNav')
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    navbarCollapse.classList.remove('show')
  }
}
</script>

<style scoped>
/* Glass Navbar */
.navbar-glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

[data-theme='dark'] .navbar-glass {
  background: rgba(33, 37, 41, 0.95); /* #212529 with opacity */
}

.scrolled {
  background: var(--nav-bg) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Links */
.nav-link {
  color: var(--nav-text) !important;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  position: relative;
  transition: color 0.3s ease;
}

.hover-underline::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 5px;
  left: 50%;
  background-color: var(--bs-primary);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.router-link-active::after {
  width: 80%;
}

.nav-link:hover,
.router-link-active {
  color: var(--bs-primary) !important;
}

/* Utilities */
.cursor-pointer {
  cursor: pointer;
}

.hover-text-primary:hover {
  color: var(--bs-primary) !important;
}

.hover-bg-light:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
[data-theme='dark'] .hover-bg-light:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.transition-all {
  transition: all 0.3s ease;
}

.font-heading {
  font-family: var(--font-heading);
}

.tracking-tight {
  letter-spacing: -0.5px;
}

/* Hamburger Icon */
.hamburger-icon {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hamburger-icon span {
  display: block;
  height: 2px;
  width: 100%;
  background: var(--nav-text);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile Adjustments */
@media (max-width: 991.98px) {
  .navbar-collapse {
    background: var(--nav-bg);
    margin: 0 -1rem;
    padding: 1rem;
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .nav-link {
    padding: 0.75rem 0 !important;
    font-size: 1.1rem;
  }

  .hover-underline::after {
    left: 0;
    transform: none;
    bottom: 0;
  }

  .nav-link:hover::after,
  .router-link-active::after {
    width: 40px;
  }

  .navbar-actions {
    justify-content: space-around;
  }

  .border-lg-0 {
    border: none !important;
  }
}

/* Dropdown */
.dropdown-menu {
  background-color: var(--card-bg);
  border-color: var(--border-color);
}
.dropdown-item {
  color: var(--body-text);
}
.dropdown-item:hover {
  background-color: var(--input-bg);
}
</style>
