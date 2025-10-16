import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  SET_SEARCH_QUERY,
  SET_CATEGORY_FILTER,
  SET_PRICE_FILTER,
  SET_RATING_FILTER,
  CLEAR_FILTERS
} from "../actions/actionTypes";

const initialState = {
  products: [],
  filteredProducts: [],
  product: null,
  loading: false,
  error: null,
  filters: {
    searchQuery: "",
    category: "all",
    priceRange: { min: 0, max: 50000 },
    minRating: 0
  }
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {

    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAILS_REQUEST: {
      return { ...state, loading: true, error: null };
    }

    case PRODUCT_LIST_SUCCESS: {
      const productsList = Array.isArray(action.payload)
        ? action.payload
        : action.payload.products || [];
      return {
        ...state,
        loading: false,
        products: productsList,
        filteredProducts: productsList,
        error: null
      };
    }

    case PRODUCT_DETAILS_SUCCESS: {
      return { ...state, loading: false, product: action.payload, error: null };
    }

    case PRODUCT_CREATE_SUCCESS: {
      const newItem = action.payload;
      const allAfterAdd = [...state.products, newItem];
      return {
        ...state,
        loading: false,
        products: allAfterAdd,
        filteredProducts: allAfterAdd
      };
    }

    case PRODUCT_UPDATE_SUCCESS: {
      const updated = action.payload;
      const updatedList = state.products.map((p) =>
        p.id === updated.id ? updated : p
      );
      return {
        ...state,
        loading: false,
        products: updatedList,
        filteredProducts: updatedList,
        product: state.product?.id === updated.id ? updated : state.product
      };
    }

    case PRODUCT_DELETE_SUCCESS: {
      const idToRemove = action.payload;
      const listAfterDelete = state.products.filter(
        (p) => p.id !== idToRemove
      );
      return {
        ...state,
        loading: false,
        products: listAfterDelete,
        filteredProducts: listAfterDelete,
        product: state.product?.id === idToRemove ? null : state.product
      };
    }

    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAILS_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }

    case SET_SEARCH_QUERY: {
      const text = action.payload.toLowerCase();
      const searchResults = state.products.filter(
        (p) =>
          p.title.toLowerCase().includes(text) ||
          p.description.toLowerCase().includes(text) ||
          p.brand.toLowerCase().includes(text)
      );
      return {
        ...state,
        filters: { ...state.filters, searchQuery: action.payload },
        filteredProducts: searchResults
      };
    }

    case SET_CATEGORY_FILTER: {
      const cat = action.payload;
      const catResults =
        cat === "all"
          ? state.products
          : state.products.filter((p) => p.category === cat);
      return {
        ...state,
        filters: { ...state.filters, category: cat },
        filteredProducts: catResults
      };
    }

    case SET_PRICE_FILTER: {
      const range = action.payload;
      const priceResults = state.products.filter(
        (p) => p.price >= range.min && p.price <= range.max
      );
      return {
        ...state,
        filters: { ...state.filters, priceRange: range },
        filteredProducts: priceResults
      };
    }

    case SET_RATING_FILTER: {
      const rating = action.payload;
      const ratingResults = state.products.filter(
        (p) => (p.rating?.rate || 0) >= rating
      );
      return {
        ...state,
        filters: { ...state.filters, minRating: rating },
        filteredProducts: ratingResults
      };
    }

    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: initialState.filters,
        filteredProducts: state.products
      };
    }

    default:
      return state;
  }
};

export default productReducer;
