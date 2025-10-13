// API Service for making HTTP requests
const BASE_URL = 'https://fakestoreapi.com'; // Using Fake Store API for demo

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Product API calls
export const productAPI = {
  // Get all products
  getProducts: async () => {
    return await apiRequest('/products');
  },

  // Get single product by ID
  getProduct: async (id) => {
    return await apiRequest(`/products/${id}`);
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    return await apiRequest(`/products/category/${category}`);
  },

  // Get all categories
  getCategories: async () => {
    return await apiRequest('/products/categories');
  }
};

// Cart API calls (using localStorage as mock backend)
export const cartAPI = {
  // Get cart from localStorage
  getCart: async () => {
    const cart = localStorage.getItem('amazonCart');
    return cart ? JSON.parse(cart) : [];
  },

  // Save cart to localStorage
  saveCart: async (cartItems) => {
    localStorage.setItem('amazonCart', JSON.stringify(cartItems));
    return cartItems;
  },

  // Clear cart
  clearCart: async () => {
    localStorage.removeItem('amazonCart');
    return [];
  }
};

// Auth API calls
export const authAPI = {
  // Login user
  login: async (email, password) => {
    // Using Fake Store API for demo authentication
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: password
      })
    });
  },

  // Register user
  register: async (userData) => {
    return await apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Get user profile
  getUser: async (id) => {
    return await apiRequest(`/users/${id}`);
  }
};

// Order API calls
export const orderAPI = {
  // Create new order
  createOrder: async (orderData) => {
    return await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  // Get user orders
  getUserOrders: async (userId) => {
    return await apiRequest(`/orders/user/${userId}`);
  },

  // Get order by ID
  getOrder: async (orderId) => {
    return await apiRequest(`/orders/${orderId}`);
  }
};

// Utility functions
export const apiUtils = {
  // Format price
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  },

  // Calculate total
  calculateTotal: (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Generate unique ID
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Debounce function for search
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Mock data for offline development
export const mockData = {
  products: [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      price: 2999,
      description: "High-quality wireless headphones with noise cancellation",
      category: "electronics",
      image: "https://via.placeholder.com/300",
      rating: { rate: 4.5, count: 120 }
    },
    {
      id: 2,
      title: "Smart Watch Fitness Tracker",
      price: 4999,
      description: "Advanced fitness tracking smartwatch",
      category: "electronics",
      image: "https://via.placeholder.com/300",
      rating: { rate: 4.2, count: 89 }
    },
    {
      id: 3,
      title: "Laptop Backpack",
      price: 1299,
      description: "Waterproof laptop backpack with USB charging port",
      category: "fashion",
      image: "https://via.placeholder.com/300",
      rating: { rate: 4.3, count: 156 }
    },
    {
      id: 4,
      title: "Kitchen Mixer Grinder",
      price: 3499,
      description: "3-jar mixer grinder for kitchen",
      category: "home",
      image: "https://via.placeholder.com/300",
      rating: { rate: 4.1, count: 67 }
    },
    {
      id: 5,
      title: "Sports Running Shoes",
      price: 1999,
      description: "Comfortable running shoes for men",
      category: "fashion",
      image: "https://via.placeholder.com/300",
      rating: { rate: 4.4, count: 203 }
    },
    {
      id: 6,
      title: "Smartphone 128GB",
      price: 15999,
      description: "Latest smartphone with 128GB storage",
      category: "electronics",
      image: "https://via.placeholder.com/300",
      rating: { rate: 4.6, count: 45 }
    }
  ],

  categories: [
    "electronics",
    "fashion",
    "home",
    "sports",
    "books"
  ]
};

// Enhanced API service with fallback to mock data
export const enhancedAPI = {
  // Get products with fallback
  getProductsWithFallback: async () => {
    try {
      const products = await productAPI.getProducts();
      return products;
    } catch (error) {
      console.warn('Using mock data due to API error:', error);
      return mockData.products;
    }
  },

  // Get product details with fallback
  getProductWithFallback: async (id) => {
    try {
      const product = await productAPI.getProduct(id);
      return product;
    } catch (error) {
      console.warn('Using mock data due to API error:', error);
      return mockData.products.find(p => p.id === parseInt(id)) || null;
    }
  },

  // Get categories with fallback
  getCategoriesWithFallback: async () => {
    try {
      const categories = await productAPI.getCategories();
      return categories;
    } catch (error) {
      console.warn('Using mock categories due to API error:', error);
      return mockData.categories;
    }
  }
};

export default {
  productAPI,
  cartAPI,
  authAPI,
  orderAPI,
  apiUtils,
  mockData,
  enhancedAPI
};