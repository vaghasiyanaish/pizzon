import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  SET_SEARCH_QUERY,
  SET_CATEGORY_FILTER,
  SET_PRICE_FILTER,
  SET_RATING_FILTER,
  CLEAR_FILTERS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST
} from './actionTypes';
import { v4 as uuidv4 } from 'uuid';

// Mock product data
const mockProducts = [
  {
    id: '1',
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 2999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: { rate: 4.5, count: 1245 },
    description: "High-quality wireless headphones with active noise cancellation, perfect for music lovers and professionals.",
    category: "electronics",
    brand: "Sony",
    inStock: true,
    features: ["Noise Cancellation", "30hrs Battery", "Fast Charging"],
    specifications: {
      "Battery": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g"
    }
  },
  {
    id: '2',
    title: "Smart Watch with Fitness Tracking",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    rating: { rate: 4.3, count: 892 },
    description: "Advanced smartwatch with heart rate monitoring, GPS, and multiple sports modes.",
    category: "electronics",
    brand: "Samsung",
    inStock: true,
    features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery": "7 days",
      "Compatibility": "Android & iOS"
    }
  },
  {
    id: '3',
    title: "Men's Casual Shirt - Regular Fit",
    price: 899,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    rating: { rate: 4.0, count: 2341 },
    description: "Comfortable cotton shirt for casual wear, available in multiple colors.",
    category: "fashion",
    brand: "H&M",
    inStock: true,
    features: ["100% Cotton", "Machine Wash", "Regular Fit"],
    specifications: {
      "Fabric": "100% Cotton",
      "Fit": "Regular",
      "Care": "Machine Wash"
    }
  }
];

// Get products from localStorage or use mock data
const getProductsFromStorage = () => {
  const stored = localStorage.getItem('amazonProducts');
  return stored ? JSON.parse(stored) : mockProducts;
};

const saveProductsToStorage = (products) => {
  localStorage.setItem('amazonProducts', JSON.stringify(products));
};

// Action Creators
export const getProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    setTimeout(() => {
      const products = getProductsFromStorage();
      const { filters } = getState().productList;

      // Apply filters
      let filteredProducts = products;

      // Apply search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }

      // Apply category filter
      if (filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
          product.category === filters.category
        );
      }

      // Apply price filter
      filteredProducts = filteredProducts.filter(product =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
      );

      // Apply rating filter
      if (filters.minRating > 0) {
        filteredProducts = filteredProducts.filter(product =>
          product.rating.rate >= filters.minRating
        );
      }

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: {
          products: products || [],
          filteredProducts: filteredProducts || []
        }
      });
    }, 500);

  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    setTimeout(() => {
      const products = getProductsFromStorage();
      const product = products.find(p => p.id === id);
      if (product) {
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: product
        });
      } else {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: 'Product not found'
        });
      }
    }, 500);

  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    setTimeout(() => {
      const products = getProductsFromStorage();
      const newProduct = {
        id: uuidv4(),
        ...productData,
        rating: productData.rating || { rate: 0, count: 0 },
        createdAt: new Date().toISOString()
      };

      const updatedProducts = [...products, newProduct];
      saveProductsToStorage(updatedProducts);

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: newProduct
      });
    }, 500);

  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.message
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    setTimeout(() => {
      const products = getProductsFromStorage();
      const updatedProducts = products.map(product =>
        product.id === id ? { ...product, ...productData } : product
      );
      saveProductsToStorage(updatedProducts);

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: { id, ...productData }
      });
    }, 500);

  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.message
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    setTimeout(() => {
      const products = getProductsFromStorage();
      const filteredProducts = products.filter(product => product.id !== id);
      saveProductsToStorage(filteredProducts);

      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: id
      });
    }, 500);

  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.message
    });
  }
};

// Filter Actions
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query
});

export const setCategoryFilter = (category) => ({
  type: SET_CATEGORY_FILTER,
  payload: category
});

export const setPriceFilter = (priceRange) => ({
  type: SET_PRICE_FILTER,
  payload: priceRange
});

export const setRatingFilter = (minRating) => ({
  type: SET_RATING_FILTER,
  payload: minRating
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});

// Cart Actions
export const addToCart = (product, quantity = 1) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: { ...product, quantity }
  });

  // Save to localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const updateCartQuantity = (productId, quantity) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_CART_QUANTITY,
    payload: { productId, quantity }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
  localStorage.removeItem('cartItems');
};

// Wishlist Actions
export const addToWishlist = (product) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: product
  });

  localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
};

export const removeFromWishlist = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload: productId
  });

  localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
};