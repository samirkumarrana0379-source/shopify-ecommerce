import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Men from "./Components/Collection/Men";
import Women from "./Components/Collection/Women";
import Navbar from "./Components/Pages/Navbar";
import Kids from "./Components/Collection/Kids";
import Jewellery from "./Components/Collection/Jewellery";
import Order from "./Components/Order";
import Product from "./Components/Pages/Product";
import Chief from "./Components/Pages/Chief";
import Cart from "./Components/Pages/Cart";
import { createContext, useState } from "react";
import Address from "./Components/CRUD/Address";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import Account from "./Components/Pages/Account";
import Footer from "./Components/Pages/Footer";
import Profile from "./Components/Pages/Profile";
import About from "./Components/FooterPages/About";
import Careers from "./Components/FooterPages/Careers";
import Payments from "./Components/FooterPages/Payments";
import Shipping from "./Components/FooterPages/Shipping";
import Privacy from "./Components/FooterPages/Privacy";
import Faq from "./Components/FooterPages/Faq";
import Returns from "./Components/FooterPages/Returns";
import Admin from "./Components/Admin/Admin";

export const CartProductContext = createContext();

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const isLogin = localStorage.getItem("isLogin") === "true";

  return (
    <CartProductContext.Provider value={{cartProducts, setCartProducts,
        wishlist,setWishlist, search, setSearch,darkMode, setDarkMode,}}>
      <BrowserRouter>
        <Navbar />

        <Routes>
        
          <Route path="/" element={<Chief />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/about" element={<About />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />}/>

          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/jewellery" element={<Jewellery />} />

          <Route
            path="/product/:id"
            element={isLogin ? <Product /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={isLogin ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/account"
            element={isLogin ? <Account /> : <Navigate to="/login" />}
          />
          <Route
            path="/order"
            element={isLogin ? <Order /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isLogin ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/address"
            element={isLogin ? <Address /> : <Navigate to="/login" />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProductContext.Provider>
  );
}

export default App;