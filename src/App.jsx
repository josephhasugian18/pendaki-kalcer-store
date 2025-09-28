import { OrderProvider } from "./context/OrderContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";
import { ProductsProvider } from "./context/ProductsContext";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";

import Dashboard from "./pages/frontpage/Dashboard";
import ProductDetail from "./pages/frontpage/ProductDetail";
import CategoryPage from "./pages/frontpage/CategoryPage";
import Cart from "./pages/frontpage/Cart";
import Wishlist from "./pages/frontpage/Wishlist";
import CheckOut from "./pages/frontpage/CheckOut";
import Payment from "./pages/frontpage/Payment";
import MainLayout from "./layouts/MainLayout";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminProducts from "./pages/adminpages/AdminProducts";
import AboutPage from "./pages/adminpages/AboutPage";
import AdminOrders from "./pages/adminpages/AdminOrders";
import AddProduct from "./pages/adminpages/AddProduct";
import EditProduct from "./pages/adminpages/EditProduct";
import LoginPage from "./pages/adminpages/LoginPage";
import PrivateRoute from "./pages/adminpages/PrivateRoute";

function App() {
  return (
    <ToastProvider>
      <ProductsProvider>
        <OrderProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <Routes>
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="/new" element={<CategoryPage showNew={true} />} />
                    <Route path="category/:category" element={<CategoryPage />} />
                    <Route path="category/:category/:subcategory" element={<CategoryPage />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<CheckOut />} />
                    <Route path="payment" element={<Payment />} />
                  </Route>

                  <Route path="/login" element={<LoginPage />} />

                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute>
                        <AdminLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/add" element={<AddProduct />} />
                    <Route path="products/:id/edit" element={<EditProduct />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="about" element={<AboutPage />} />
                  </Route>
                </Routes>
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </OrderProvider>
      </ProductsProvider>
    </ToastProvider>
  );
}

export default App;
