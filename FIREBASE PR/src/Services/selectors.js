// Services/selectors.js
import { createSelector } from 'reselect';

// Memoized selectors to prevent unnecessary re-renders
export const selectAuth = (state) => state.auth || {};
export const selectCart = (state) => state.cart || {};
export const selectWishlist = (state) => state.wishlist || {};
export const selectProductList = (state) => state.productList || {};

export const selectUserInfo = createSelector(
  [selectAuth],
  (auth) => auth.userInfo || null
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems || []
);

export const selectWishlistItems = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.wishlistItems || []
);

export const selectFilters = createSelector(
  [selectProductList],
  (productList) => productList.filters || {}
);