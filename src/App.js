import { Route, Routes } from "react-router-dom";
import Cart from "./components/screens/Cart";
import Home from "./components/screens/Home";
import Ao from "./components/screens/Ao";
import Quan from "./components/screens/Quan";
import PhuKien from "./components/screens/PhuKien";
import ProductDetail from "./components/screens/ProductDetail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ShowProfile from "./components/Auth/ShowProfile";
import "bootstrap/dist/css/bootstrap.css";
import Order from "./components/Order/Order";
import ViewOrder from "./components/Order/ViewOrder";
import ProductManager from "./components/Admin/ProductManager";
import NotFound from "./components/layouts/NotFound";
import "../node_modules/swiper/swiper-bundle.min.css";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UserManager from "./components/Admin/UserManager";
import './components/styles/DefaultLayoutStyle.css'
import Search from "./components/screens/Search";
import Dashboard from "./components/Admin/Dashboard";
import OrderManager from "./components/Admin/OrderManager";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<ShowProfile />} />
      <Route path="/ao" element={<Ao />} />
      <Route path="/quan" element={<Quan />} />
      <Route path="/phukien" element={<PhuKien />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/detail/:id" element={<ProductDetail />} />
      <Route path="/order" element={<Order />} />
      <Route path="/view-order" element={<ViewOrder />} />
      <Route path="/product-manage" element={<ProductManager />} />
      <Route path="/user-manage" element={<UserManager />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/order-manage" element={<OrderManager />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
