import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "./utils/server";
import { loadSeller, loadUser } from "./redux/actions/user";
import { getAllEvents } from "./redux/actions/eventAction";
import { getAllProducts } from "./redux/actions/productAction";
import Store from "./redux/store";
import { Loader } from "./components/Loader";
import { Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./routes/ProtectedRoute";
import PaymentPage from "./pages/PaymentPage";
import { loadStripe } from "@stripe/stripe-js";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserInbox from "./pages/UserInbox";
import FAQ from "./pages/FAQ";
import ShopPreviewPage from "./pages/shop/ShopPreviewPage";
import CheckOutPage from "./pages/CheckOutPage";
import ProfilePage from "./pages/ProfilePage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import AboutUs from "./pages/AboutUs";
import ShopCreate from "./pages/shop/ShopCreate";
import ShopLogin from "./pages/ShopLogin";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import ShopHomePage from "./pages/shop/ShopHomePage";
import ShopAllRefund from "./pages/shop/ShopAllRefund";
import ShopCreateProduct from "./pages/shop/ShopCreateProduct";
import ShopOrderDetails from "./pages/shop/ShopOrderDetails";
import ShopAllOrders from "./pages/shop/ShopAllOrders";
import ShopAllProducts from "./pages/shop/ShopAllProducts";
import { ShopInBoxPage } from "./pages/shop/ShopInBoxPage";
import ShopDashBoardPage from "./pages/shop/ShopDashBoardPage";
import DashBoardWithdrawPage from "./pages/shop/DashBoardWithdrawPage";
import ShopSettingsPage from "./pages/shop/ShopSettingsPage";
import ShopDashBoardEventPage from "./pages/shop/ShopDashBoardEventPage";
import ShopAllEvents from "./pages/shop/ShopAllEvents";
import ShopAllCoupons from "./pages/shop/ShopAllCoupons";
import BestSellingPage from "./pages/BestSellingPage";
import PageNotFound from "./pages/PageNotFound";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { authenticateShop } = useSelector((state) => state.seller);

  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await api.get(`/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Store.dispatch(loadUser());
        await Store.dispatch(loadSeller());
        await Store.dispatch(getAllEvents());
        await Store.dispatch(getAllProducts());
        getStripeApikey();
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          {/* Payment Route wrapped with Elements */}
          {stripeApikey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApikey)}>
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <PaymentPage />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )}

          {/* Other Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route
            path="/order/success"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inbox"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserInbox />
              </ProtectedRoute>
            }
          />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/shop-create" element={<ShopCreate />} />
          <Route path="/shop-login" element={<ShopLogin />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllRefund />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop/order/:id"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopInBoxPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopDashBoardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <DashBoardWithdrawPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopDashBoardEventPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}