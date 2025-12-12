<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-lg border-0">
          <div class="card-body p-5">
            <h2 class="card-title text-center mb-4 fw-bold">Admin Login</h2>

            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <form @submit.prevent="signInWithEmail">
              <div class="mb-3">
                <input v-model="email" type="email" class="form-control" placeholder="Email" required>
              </div>
              <div class="mb-3">
                <input v-model="password" type="password" class="form-control" placeholder="Password" required>
              </div>
              <div class="d-grid gap-2 mb-4">
                <button type="submit" class="btn btn-dark btn-lg" :disabled="isLoading">
                  {{ isLoading ? 'Loading...' : 'Sign In' }}
                </button>
              </div>
            </form>

            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref(null);
const isLoading = ref(false);


const signInWithEmail = async () => {
  error.value = null;
  isLoading.value = true;
  try {

    await signInWithEmailAndPassword(auth, email.value, password.value);


    router.push({ name: 'admin' });
  } catch (err) {

    error.value = err.message.replace('Firebase: Error (auth/', '').replace(').', '').replace(/-/g, ' ');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

</script>
