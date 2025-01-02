import api from "@/utils/server";

// Create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "productCreateRequest" });

    const formData = new FormData();
    
    // Add basic product details
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("tags", productData.tags);
    formData.append("originalPrice", productData.originalPrice);
    formData.append("discountPrice", productData.discountPrice);
    formData.append("stock", productData.stock);
    formData.append("shopId", productData.shopId);

    // Handle images
    if (productData.images) {
      productData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const { data } = await api.post("/product/create-product", formData);

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response?.data?.message || "Failed to create product",
    });
  }
};

// Get All Products of a shop
export const getAllProductsShop = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsShopRequest" });

    const { data } = await api.get(`/product/get-all-products-shop/${shopId}`);
    
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response?.data?.message || "Failed to fetch shop products",
    });
  }
};

// Delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await api.delete(`/product/delete-shop-product/${id}`);

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
    // Optional: Refresh products list after deletion
    dispatch(getAllProducts());
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || "Failed to delete product",
    });
  }
};

// Get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsRequest" });
    const { data } = await api.get("/product/get-all-products");
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
      
    });
  } catch (error) {
    console.error("API fetch error:", error.response?.data || error.message);
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response?.data?.message || "Failed to fetch products",
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};