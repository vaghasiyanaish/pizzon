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
  CLEAR_FILTERS
} from '../actions/actionTypes';

const initialState = {
  products: [],
  filteredProducts: [],
  product: null,
  loading: false,
  error: null,
  filters: {
    searchQuery: '',
    category: 'all',
    priceRange: { min: 0, max: 50000 },
    minRating: 0
  }
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAILS_REQUEST:
    case PRODUCT_CREATE_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case PRODUCT_LIST_SUCCESS:
      const productsData = action.payload.products || [];
      const filteredData = action.payload.filteredProducts || [];

      return {
        ...state,
        loading: false,
        products: productsData,
        filteredProducts: filteredData,
        error: null
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null
      };

    case PRODUCT_CREATE_SUCCESS:
      const newProducts = [...state.products, action.payload];
      return {
        ...state,
        loading: false,
        products: newProducts,
        filteredProducts: newProducts,
        error: null
      };

    case PRODUCT_UPDATE_SUCCESS:
      const updatedProducts = state.products.map(product =>
        product.id === action.payload.id ? action.payload : product
      );
      return {
        ...state,
        loading: false,
        products: updatedProducts,
        filteredProducts: updatedProducts,
        product: state.product?.id === action.payload.id ? action.payload : state.product,
        error: null
      };

    case PRODUCT_DELETE_SUCCESS:
      const filteredProducts = state.products.filter(product => product.id !== action.payload);
      return {
        ...state,
        loading: false,
        products: filteredProducts,
        filteredProducts: filteredProducts,
        product: state.product?.id === action.payload ? null : state.product,
        error: null
      };

    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAILS_FAIL:
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        filters: { ...state.filters, searchQuery: action.payload }
      };

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        filters: { ...state.filters, category: action.payload }
      };

    case SET_PRICE_FILTER:
      return {
        ...state,
        filters: { ...state.filters, priceRange: action.payload }
      };

    case SET_RATING_FILTER:
      return {
        ...state,
        filters: { ...state.filters, minRating: action.payload }
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        filteredProducts: state.products
      };

    default:
      return state;
  }
};

export default productReducer;