import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST
} from '../actions/actionTypes';

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem('wishlistItems')) || []
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const existingWishlistItem = state.wishlistItems.find(
        item => item.id === action.payload.id
      );

      if (existingWishlistItem) {
        return state;
      }

      const newWishlistItems = [...state.wishlistItems, action.payload];
      return {
        ...state,
        wishlistItems: newWishlistItems
      };

    case REMOVE_FROM_WISHLIST:
      const filteredWishlistItems = state.wishlistItems.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        wishlistItems: filteredWishlistItems
      };

    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlistItems: []
      };

    default:
      return state;
  }
};

export default wishlistReducer;