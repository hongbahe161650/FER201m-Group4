import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import Login from "./screens/login/Login";
import Ao from "./screens/Ao";
import Quan from "./screens/Quan";
import PhuKien from "./screens/Phu_Kien";

import ForgotPassword from "./screens/login/ForgotPassword";
import "../src/screens/login/styles.css";
import ProductDetail from "./screens/ProductDetail";
function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/home" element={<Home/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/ao" element={<Ao/>}/>
  <Route path="/quan" element={<Quan/>}/>
  <Route path="/phukien" element={<PhuKien/>}/>
  <Route path="/product/detail/:id" element={<ProductDetail/>}/>
 
  <Route path="/forgotpassword" element={<ForgotPassword/>}/>
</Routes>

</BrowserRouter>
  );
}

export default App;
