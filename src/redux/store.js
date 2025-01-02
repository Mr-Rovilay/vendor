import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { sellerReducer } from "./reducer/seller";
import { productReducer } from "./reducer/productReducer";
import { eventReducer } from "./reducer/eventReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderReducer } from "./reducer/orderReducer";
import { wishlistReducer } from "./reducer/wishlistReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default Store;
