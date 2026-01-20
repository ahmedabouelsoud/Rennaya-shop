<template>
  <div class="container py-5 mt-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold display-4">Contact Us</h1>
      <p class="lead text-muted">We'd love to hear from you. Get in touch with us.</p>
    </div>

    <div class="row g-5">
      <!-- Contact Info -->
      <div class="col-md-5">
        <div class="bg-light p-4 rounded h-100 shadow-sm">
          <h3 class="fw-bold mb-4">Get In Touch</h3>

          <div class="mb-4">
            <h5 class="fw-bold"><i class="bi bi-geo-alt text-danger me-2"></i> Address</h5>
            <p class="mb-0 text-muted">123 Sports Avenue, Athletic City</p>
            <p class="text-muted">Cairo, Egypt</p>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold"><i class="bi bi-envelope text-danger me-2"></i> Email</h5>
            <p class="text-muted">support@rennaya.com</p>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold"><i class="bi bi-telephone text-danger me-2"></i> Phone</h5>
            <p class="text-muted">+20 123 456 7890</p>
          </div>

          <hr />

          <h5 class="fw-bold mb-3">Follow Us</h5>
          <div class="d-flex gap-3">
            <a href="#" class="btn btn-outline-dark rounded-circle"
              ><i class="bi bi-facebook"></i
            ></a>
            <a href="#" class="btn btn-outline-dark rounded-circle"
              ><i class="bi bi-instagram"></i
            ></a>
            <a href="#" class="btn btn-outline-dark rounded-circle"
              ><i class="bi bi-twitter-x"></i
            ></a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="col-md-7">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h3 class="fw-bold mb-4">Send Message</h3>
            <form @submit.prevent="submitForm">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" required />
                </div>
                <div class="col-12">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-control" required />
                </div>
                <div class="col-12">
                  <label class="form-label">Subject</label>
                  <select class="form-select">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Returns & Exchanges</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">Message</label>
                  <textarea class="form-control" rows="5" required></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-danger btn-lg rounded-0 w-100">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const submitForm = () => {
  alert('Thank you for contacting us! We will get back to you shortly.')
}
</script>
