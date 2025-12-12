<template>
  <div class="bg-light py-5 position-relative">

    <div v-if="toastMessage" class="toast-notification">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-check-circle-fill text-success"></i>
        <span>{{ toastMessage }}</span>
      </div>
    </div>


      <div class="text-center mb-5 hero-shop text-white d-flex align-items-center justify-content-center direction-column"
        style="background: url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200') center/cover; height: 200px;">
        <h1 class="fw-bold display-4">Shop</h1>
      </div>
<div class="container">
      <div class="row">
        <div class="col-lg-3 mb-4">
          <div class="bg-white p-4 shadow-sm rounded sticky-top" style="top: 20px; z-index: 1;">

            <h5 class="fw-bold mb-3">Filter By Category</h5>
            <div class="form-check mb-2" v-for="cat in categories" :key="cat">
              <input class="form-check-input" type="checkbox" :id="cat" :value="cat" v-model="selectedCategories">
              <label class="form-check-label" :for="cat">{{ cat }}</label>
            </div>

            <hr class="my-4 text-muted">

            <h5 class="fw-bold mb-3">Filter By Price</h5>
            <label class="form-label text-muted small">Max Price: <span class="fw-bold text-dark">${{ maxPrice.toFixed(2) }}</span></label>
            <input type="range" class="form-range text-danger" min="0" max="1000" step="10" v-model.number="maxPrice">

            <hr class="my-4 text-muted">

            <h5 class="fw-bold mb-3">Tags</h5>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge bg-light text-dark border tag-hover" v-for="tag in ['Sports', 'Gym', 'Indoor']" :key="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <div class="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
            <span class="text-muted">Showing <strong>{{ filteredProducts.length }}</strong> results</span>

            <select class="form-select w-auto border-0 bg-light" v-model="sortBy">
              <option value="default">Default Sorting</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-danger" role="status"></div>
          </div>

          <div v-else-if="filteredProducts.length === 0" class="alert alert-warning text-center shadow-sm border-0">
            <p>
              ⚠️ عذراً، لا توجد منتجات تطابق بحثك.
            </p>
          </div>

          <div v-else class="row g-4">
            <div class="col-md-4 col-sm-6" v-for="product in filteredProducts" :key="product.id">
              <div class="card h-100 border-0 shadow-sm text-center product-card overflow-hidden">

                <div v-if="product.discount > 0"
                     class="position-absolute top-0 start-0 m-3 badge bg-danger rounded-pill">
                  {{ product.discount }}% OFF
                </div>
                <div v-else-if="product.price < 100" class="position-absolute top-0 start-0 m-3 badge bg-danger rounded-pill">
                  SALE
                </div>

                <div class="card-img-top p-4 bg-light d-flex align-items-center justify-content-center position-relative image-container"
                  style="height: 250px;">
                  <img :src="product.image || 'https://via.placeholder.com/200'" class="img-fluid product-img"
                    style="max-height: 100%;">

                  <div class="overlay d-flex gap-2 justify-content-center align-items-center">
                    <button class="btn btn-light rounded-circle shadow-sm" title="View"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-light rounded-circle shadow-sm" title="Wishlist"><i class="bi bi-heart"></i></button>
                  </div>
                </div>

                <div class="card-body d-flex flex-column">
                  <div class="mb-auto">
                    <h6 class="card-title fw-bold mt-1 text-truncate">{{ product.name }}</h6>

                    <div class="d-flex justify-content-center align-items-center gap-2 mt-2">
                        <p v-if="product.discount > 0" class="text-muted text-decoration-line-through mb-0" style="font-size: 0.9rem;">
                            ${{ product.price.toFixed(2) }}
                        </p>
                        <p class="fw-bold fs-5 mb-0" :class="product.discount > 0 ? 'text-danger' : 'text-dark'">
                            ${{ product.newPrice ? product.newPrice.toFixed(2) : product.price.toFixed(2) }}
                        </p>
                    </div>

                    <small class="text-muted text-uppercase" style="font-size: 0.75rem;">{{ formatCategory(product.Category) }}</small>
                  </div>
                  <button @click="addToCart(product)" class="btn btn-outline-danger btn-sm w-100 rounded-0 mt-3 btn-hover-fill">
                    Add To Cart
                  </button>
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
import { ref, onMounted, computed } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


const products = ref([]);
const loading = ref(true);
const toastMessage = ref(null);


const categories = ref([]);
const selectedCategories = ref([]);

const maxPrice = ref(1000);
const sortBy = ref('default');


const formatCategory = (cat) => {
  if (!cat) return '';
  return cat.charAt(0).toUpperCase() + cat.slice(1);
};


const calculatePriceWithDiscount = (price, discount) => {
  const p = Number(price) || 0;
  const d = Number(discount) || 0;
  return d > 0 ? p * (1 - d / 100) : p;
};


const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const loadedProducts = querySnapshot.docs.map(doc => {
      const data = doc.data();


      const normalizedCategory = data.Category
        ? String(data.Category).trim().toLowerCase()
        : "uncategorized";

      return {
        id: doc.id,
        ...data,
        price: Number(data.price) || 0,
        discount: Number(data.discount) || 0,
        newPrice: data.newPrice
          ? Number(data.newPrice)
          : calculatePriceWithDiscount(data.price, data.discount),

        Category: normalizedCategory
      };
    });

    products.value = loadedProducts;


    categories.value = [...new Set(loadedProducts.map(p => p.Category))];

  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});


const filteredProducts = computed(() => {
  let result = products.value;


  if (selectedCategories.value.length > 0) {
    result = result.filter(item =>
      selectedCategories.value.includes(item.Category)
    );
  }


  result = result.filter(item => item.newPrice <= maxPrice.value);

  if (sortBy.value === 'low-high') {
    result = [...result].sort((a, b) => a.newPrice - b.newPrice);
  } else if (sortBy.value === 'high-low') {
    result = [...result].sort((a, b) => b.newPrice - a.newPrice);
  }

  return result;
});


const addToCart = (product) => {
  toastMessage.value = `Added "${product.name}" to cart!`;
  setTimeout(() => {
    toastMessage.value = null;
  }, 3000);
};
</script>


<style scoped>

.hero-shop {
  position: relative;
}
.hero-shop::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.hero-shop h1 {
  position: relative;
  z-index: 2;
  letter-spacing: 2px;
}


.product-card {
  transition: all 0.3s ease;
  background: #fff;
}
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}


.image-container {
  overflow: hidden;
}
.product-img {
  transition: transform 0.5s ease;
}
.product-card:hover .product-img {
  transform: scale(1.1);
}


.overlay {
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  transition: bottom 0.3s ease;
  opacity: 0;
}
.product-card:hover .overlay {
  bottom: 20px;
  opacity: 1;
}


.btn-hover-fill:hover {
  background-color: #dc3545;
  color: white;
}


.tag-hover {
  cursor: pointer;
  transition: background 0.2s;
}
.tag-hover:hover {
  background-color: #e2e6ea !important;
}

/* Toast Notification Styling */
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 1050;
  border-left: 5px solid #198754;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
</style>
