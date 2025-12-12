<template>
  <div class="container py-5">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold">🛒 Admin Dashboard</h1>
      <button @click="handleSignOut" class="btn btn-danger shadow-sm">
        <i class="bi bi-box-arrow-right me-2"></i> Sign Out
      </button>
    </div>

    <div class="row">
      <div class="col-lg-5 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-dark text-white">
            <h5 class="mb-0">{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSave">

              <div class="mb-3">
                <label class="form-label">Product Name</label>
                <input v-model="form.name" type="text" class="form-control" required placeholder="Ex: Nike Air Max">
              </div>

              <div class="mb-3">
                <label class="form-label">Price ($)</label>
                <input v-model.number="form.price" type="number" class="form-control" required placeholder="Ex: 150">
              </div>

              <div class="mb-3">
                <label class="form-label">Discount (%)</label>
                <input v-model.number="form.discount" type="number" class="form-control" placeholder="Ex: 10, 25, 50" min="0" max="100">
                <small v-if="form.price && form.discount > 0" class="text-info">
                  New Price: ${{ calculateNewPrice }}
                </small>
              </div>

              <div class="mb-3">
                <label class="form-label">Category (Select or Type New)</label>
                <div class="input-group">
                  <input v-model="form.Category"
                         ref="categoryInput"
                         list="category-list"
                         class="form-control"
                         placeholder="Type or click the arrow to select"
                         required>

                  <button class="btn btn-outline-secondary" type="button" @click="$refs.categoryInput.focus()">
                      <i class="bi bi-caret-down-fill"></i>
                  </button>
                </div>

                <datalist id="category-list">
                  <option v-for="cat in categoriesList" :key="cat.id" :value="cat.name"></option>
                </datalist>
                <small class="text-muted">
                    If the category is new, it will be added when you save the product.
                </small>
              </div>
              <div class="mb-3">
                <label class="form-label">Brand</label>
                <input v-model="form.brand" type="text" class="form-control" placeholder="Ex: Adidas, Nike">
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Product Image</label>

                <div class="alert alert-info py-2 small" role="alert">
                    Choose EITHER a file from your device OR paste a direct URL.
                </div>

                <div class="mb-2">
                    <label class="form-label small text-muted">Upload File:</label>
                    <input type="file"
                           @change="handleFileUpload"
                           class="form-control"
                           accept="image/*">
                </div>

                <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mb-2">
                    <div class="progress">
                        <div class="progress-bar bg-danger"
                             role="progressbar"
                             :style="{ width: uploadProgress + '%' }"
                             :aria-valuenow="uploadProgress"
                             aria-valuemin="0"
                             aria-valuemax="100">
                            {{ uploadProgress.toFixed(0) }}%
                        </div>
                    </div>
                </div>

                <div class="mb-2">
                    <label class="form-label small text-muted">Image URL:</label>
                    <input v-model="form.image"
                           type="text"
                           class="form-control"
                           placeholder="Paste image link here">
                </div>

                <img v-if="form.image"
                     :src="form.image"
                     class="mt-2 rounded"
                     style="width: 100px; height: 100px; object-fit: cover;">
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn" :class="isEditing ? 'btn-warning' : 'btn-success'" :disabled="uploadProgress > 0 && uploadProgress < 100">
                  {{ isEditing ? 'Update Product' : 'Add Product' }}
                </button>
                <button v-if="isEditing" @click="cancelEdit" type="button" class="btn btn-secondary">
                  Cancel Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-7">
        <div class="card shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">Product List ({{ products.length }})</h5>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
                    <td>
                      <img :src="product.image || 'https://via.placeholder.com/50'" class="rounded" width="50" height="50" style="object-fit: cover;">
                    </td>
                    <td class="fw-bold">{{ product.name }}</td>
                    <td :class="{'text-decoration-line-through text-muted': product.discount > 0}">${{ product.price }}</td>
                    <td>
                        <span v-if="product.discount > 0" class="badge bg-danger me-2">{{ product.discount }}% OFF</span>
                        <span v-if="product.newPrice" class="text-success fw-bold">${{ product.newPrice.toFixed(2) }}</span>
                    </td>
                    <td><span class="badge bg-light text-dark border">{{ product.Category }}</span></td>
                    <td>
                      <button @click="startEdit(product)" class="btn btn-sm btn-outline-primary me-2">
                        <i class="bi bi-pencil-square"></i> Edit
                      </button>
                      <button @click="deleteProduct(product.id)" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="products.length === 0" class="text-center py-4 text-muted">
              No products found. Start adding some!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { db, auth, storage } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const products = ref([]);
const isEditing = ref(false);
const currentId = ref(null);
const router = useRouter();
const categoriesList = ref([]);


const uploadProgress = ref(0);
const selectedFile = ref(null);


const initialFormState = {
  name: '',
  price: '',
  Category: '',
  brand: '',
  image: '',
  discount: 0,
  newPrice: 0
};
const form = ref({ ...initialFormState });


const calculatePriceWithDiscount = (price, discount) => {
    const p = Number(price) || 0;
    const d = Number(discount) || 0;
    if (d <= 0) return p;
    return (p * (1 - d / 100));
};

const calculateNewPrice = computed(() => {
  const price = Number(form.value.price) || 0;
  const discount = Number(form.value.discount) || 0;

  if (discount <= 0 || price <= 0) {
    return price.toFixed(2);
  }

  const finalPrice = price * (1 - discount / 100);
  return finalPrice.toFixed(2);
});



const fetchCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        categoriesList.value = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

const checkAndAddCategory = async (categoryName) => {
    if (!categoryName) return;
    const trimmedName = categoryName.trim();
    const q = query(collection(db, "categories"), where("name", "==", trimmedName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        try {
            await addDoc(collection(db, "categories"), {
                name: trimmedName
            });
            await fetchCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    }
};


const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        form.value.image = URL.createObjectURL(file);
    } else {
        selectedFile.value = null;
    }
};


const uploadImage = async () => {
    if (!selectedFile.value) {
        return form.value.image;
    }

    const file = selectedFile.value;
    const fileName = `${Date.now()}_${file.name}`;
    const imageRef = storageRef(storage, `product_images/${fileName}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploadProgress.value = progress;
            },
            (error) => {
                console.error("Image upload failed:", error);
                alert("Image upload failed: " + error.message);
                uploadProgress.value = 0;
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                uploadProgress.value = 100;
                selectedFile.value = null;
                setTimeout(() => uploadProgress.value = 0, 1000);
                resolve(downloadURL);
            }
        );
    });
};


const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        products.value = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const price = Number(data.price) || 0;
            const discount = Number(data.discount) || 0;

            return {
                id: doc.id,
                ...data,
                price: price,
                discount: discount,
                newPrice: data.newPrice ? Number(data.newPrice) : calculatePriceWithDiscount(price, discount)
            };
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};


const handleSave = async () => {
  if (uploadProgress.value > 0 && uploadProgress.value < 100) {
      alert("Please wait for the image upload to complete.");
      return;
  }

  try {

    const imageUrl = await uploadImage();
    await checkAndAddCategory(form.value.Category);

    const calculatedNewPrice = calculatePriceWithDiscount(form.value.price, form.value.discount).toFixed(2);

    const productData = {
        name: form.value.name,
        price: Number(form.value.price) || 0,
        Category: form.value.Category.trim(),
        brand: form.value.brand,
        image: imageUrl, 
        discount: Number(form.value.discount) || 0,
        newPrice: calculatedNewPrice
    };

    if (isEditing.value) {
      const productRef = doc(db, "products", currentId.value);
      await updateDoc(productRef, productData);
      alert("Product Updated Successfully!");
    } else {
      await addDoc(collection(db, "products"), productData);
      alert("Product Added Successfully!");
    }

    cancelEdit();
    fetchProducts();

  } catch (error) {
    console.error("Error saving product:", error);
    alert("Error saving product: " + error.message);
  }
};


const deleteProduct = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await deleteDoc(doc(db, "products", id));
      products.value = products.value.filter(p => p.id !== id);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }
};

const startEdit = (product) => {
  isEditing.value = true;
  currentId.value = product.id;
  form.value = {
    ...product,
    discount: product.discount || 0
  };
};

const cancelEdit = () => {
  isEditing.value = false;
  currentId.value = null;
  form.value = { ...initialFormState };
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
    router.push({ name: 'login' });
  } catch (error) {
    console.error("Error signing out:", error);
  }
};


onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<style scoped>
.form-control:focus, .form-select:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
</style>
