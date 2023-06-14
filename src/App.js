import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Ao from "./screens/Ao";
import Quan from "./screens/Quan";
import PhuKien from "./screens/PhuKien";
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

</Routes>

</BrowserRouter>
  );
}

export default App;
