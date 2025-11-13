import { combineReducers } from 'redux';
import productReducer from './productReducer';     
import cartReducer from './cartReducer';           
import authReducer from './authReducer';          
import wishlistReducer from './wishlistReducer';   

const rootReducer = combineReducers({
  productList: productReducer,    
  productDetails: productReducer,  

  cart: cartReducer,
  auth: authReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
