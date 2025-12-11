<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
    <div class="container">
      <router-link class="navbar-brand fw-bold fs-3" to="/">
        <span class="text-dark">Rennaya | </span><span class="text-danger">رنّاية</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold text-uppercase">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/shop">Shop</router-link></li>
          <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Contact Us</a></li>
        </ul>

        <div class="d-flex align-items-center gap-3">
           <i class="bi bi-search fs-5 cursor-pointer"></i>
           <div class="position-relative cursor-pointer">
             <i class="bi bi-cart fs-5"></i>
             <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.6rem;">2</span>
           </div>

           <button v-if="!user" @click="signIn" class="btn btn-sm btn-outline-dark">Login</button>
           <div v-else class="dropdown">
             <img :src="user.photoURL" class="rounded-circle dropdown-toggle" width="30" data-bs-toggle="dropdown">
             <ul class="dropdown-menu">
               <li><a class="dropdown-item" @click="logout" href="#">Logout</a></li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth, provider } from '../../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const user = ref(null);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});

const signIn = async () => {
  try { await signInWithPopup(auth, provider); } catch (e) { console.error(e); }
};

const logout = async () => {
  await signOut(auth);
};
</script>

<style scoped>
.nav-link { color: #222; font-size: 0.9rem; letter-spacing: 1px; }
.nav-link:hover, .router-link-active { color: #dc3545; }
.cursor-pointer { cursor: pointer; }
</style>
