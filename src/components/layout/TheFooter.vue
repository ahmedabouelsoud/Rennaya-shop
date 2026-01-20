<template>
  <footer class="footer-section pt-5 pb-3 mt-auto">
    <div class="container">
      <div class="row g-4 justify-content-between">
        <!-- Brand & About -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="mb-4">
            <span class="fs-3 fw-bold font-heading text-body">RENNAYA</span>
            <span class="fs-3 fw-bold font-heading text-primary">SHOP</span>
          </div>
          <p class="text-muted small mb-4" style="line-height: 1.8">
            Elevate your game with Rennaya. We provide premium sports equipment and apparel designed
            for performance and style. Join our community of athletes today.
          </p>
          <div class="d-flex gap-3 social-icons">
            <a
              href="#"
              class="btn btn-outline-secondary rounded-circle btn-sm d-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px"
              ><i class="bi bi-facebook"></i
            ></a>
            <a
              href="#"
              class="btn btn-outline-secondary rounded-circle btn-sm d-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px"
              ><i class="bi bi-instagram"></i
            ></a>
            <a
              href="#"
              class="btn btn-outline-secondary rounded-circle btn-sm d-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px"
              ><i class="bi bi-twitter-x"></i
            ></a>
            <a
              href="#"
              class="btn btn-outline-secondary rounded-circle btn-sm d-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px"
              ><i class="bi bi-youtube"></i
            ></a>
          </div>
        </div>

        <!-- Links -->
        <div class="col-lg-2 col-md-3 col-12 col-sm-6 mb-4">
          <h6 class="fw-bold mb-3 text-uppercase font-heading spacing-1">Shop</h6>
          <ul class="list-unstyled text-muted small footer-links">
            <li class="mb-2">
              <router-link to="/shop" class="text-decoration-none text-muted hover-primary"
                >New Arrivals</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/shop" class="text-decoration-none text-muted hover-primary"
                >Best Sellers</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/shop" class="text-decoration-none text-muted hover-primary"
                >Men</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/shop" class="text-decoration-none text-muted hover-primary"
                >Women</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/shop" class="text-decoration-none text-muted hover-primary"
                >Accessories</router-link
              >
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3 col-12 col-sm-6 mb-4">
          <h6 class="fw-bold mb-3 text-uppercase font-heading spacing-1">Company</h6>
          <ul class="list-unstyled text-muted small footer-links">
            <li class="mb-2">
              <router-link to="/about" class="text-decoration-none text-muted hover-primary"
                >About Us</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/contact" class="text-decoration-none text-muted hover-primary"
                >Contact</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/blog" class="text-decoration-none text-muted hover-primary"
                >Blog</router-link
              >
            </li>
            <li class="mb-2">
              <a href="#" class="text-decoration-none text-muted hover-primary">Careers</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-decoration-none text-muted hover-primary">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h6 class="fw-bold mb-3 text-uppercase font-heading spacing-1">Newsletter</h6>
          <p class="text-muted small mb-3">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form @submit.prevent class="mb-3">
            <div class="input-group">
              <input
                type="email"
                class="form-control border-secondary bg-transparent"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button class="btn btn-primary" type="submit"><i class="bi bi-send"></i></button>
            </div>
          </form>
          <small class="text-muted fst-italic" style="font-size: 0.75rem"
            >We promise not to spam you.</small
          >
        </div>
      </div>

      <hr class="text-muted opacity-25 my-4" />

      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
          <div class="small text-muted">© 2024 Rennaya Shop. All rights reserved.</div>
        </div>
        <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
          <div class="d-flex justify-content-center justify-content-md-end gap-2 text-muted fs-5">
            <i class="bi bi-credit-card"></i>
            <i class="bi bi-paypal"></i>
            <i class="bi bi-apple"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  background-color: var(
    --card-bg
  ); /* Using card bg for slightly different shade than body in some themes or same */
  border-top: 1px solid var(--border-color);
}
.font-heading {
  font-family: var(--font-heading);
}
.hover-primary:hover {
  color: var(--bs-primary) !important;
  transition: color 0.2s ease;
}
.footer-links li {
  transition: transform 0.2s ease;
}
.footer-links li:hover {
  transform: translateX(5px);
}
</style>
