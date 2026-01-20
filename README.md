# Rennaya Shop

A modern, responsive e-commerce front-end application built with **Vue 3** and **Firebase**. This project demonstrates a premium user interface with dynamic features including product browsing, searching, shopping cart management, and user authentication.

## 🚀 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Bootstrap 5](https://getbootstrap.com/), Bootstrap Icons, Custom CSS
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore Database, Authentication)
- **Routing**: Vue Router

## 🛠️ Setup & Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Rennaya-shop
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory if it doesn't exist (or check `src/firebase.js`) to configure your Firebase credentials.

    > Note: This project connects to a live Firebase instance.

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Build for Production

To create a production-ready build:

```bash
npm run build
```

## ✨ Features

- **Storefront**: Browse products with dynamic hero sections and promotional banners.
- **Product Search**: Real-time filtering of products by name and category (located in the Shop view).
- **Shopping Cart**: Add items to cart and view cart summary.
- **User Authentication**: Sign in with Google (Firebase Auth) to access personalized features.
- **User Profile**: Manage account details (Dashboard, Orders, Wishlist).
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Dark Mode**: Toggle between light and dark themes.

## 📂 Project Structure

- `src/views`: Page components (Home, Shop, Product, Cart, etc.)
- `src/components`: Reusable UI components (Navbar, Footer, etc.)
- `src/router`: Vue Router configuration.
- `src/assets`: Static assets.

---

Developed by Ahmed Abouelsoud
