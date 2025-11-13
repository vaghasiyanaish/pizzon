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
  RESET_CREATE_FLAG,
  RESET_UPDATE_FLAG,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: "",
  isCreate: false,
  isUpdate: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, error: "" };

    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        products: action.payload, 
        product: null,
        error: "" 
      };

    case PRODUCT_DETAILS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        product: action.payload 
      };

    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
        isCreate: true,
      };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        product: action.payload,
        isUpdate: true,
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter((p) => p.id !== action.payload),
        product: state.product?.id === action.payload ? null : state.product,
      };

    case RESET_CREATE_FLAG:
      return { ...state, isCreate: false };

    case RESET_UPDATE_FLAG:
      return { ...state, isUpdate: false };

    default:
      return state;
  }
};

export default productReducer;
