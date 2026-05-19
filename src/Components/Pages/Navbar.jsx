import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo2 from "../../assets/logo2.png";
import { useContext, useState } from "react";
import { CartProductContext } from "../../App";
import cart from "../../assets/cart.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    cartProducts,
    search,
    setSearch,
    darkMode,
    setDarkMode,
  } = useContext(CartProductContext);

  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = localStorage.getItem("isLogin") === "true";

  if (
    location.pathname.startsWith("/product/") ||
    location.pathname.startsWith("/cart")
  ) {
    return null;
  }

  return (
    <header
      className={`h-[10vh] w-full flex items-center justify-between gap-2 px-3 md:px-6 text-sm font-semibold sticky top-0 z-50 shadow-md ₹{
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-neutral-800"
      }`}
    >
    
      <NavLink to="/">
        <img
          className="h-8 w-auto md:h-10 object-contain"
          src={logo2}
          alt="logo"
        />
      </NavLink>

   
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`md:hidden flex-1 max-w-[180px] border rounded-xl px-3 py-2 outline-none text-sm ₹{
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

     
      <div className="hidden md:flex items-center gap-5">
        <NavLink to="/men">Men</NavLink>
        <NavLink to="/women">Women</NavLink>
        <NavLink to="/kids">Kids</NavLink>
        <NavLink to="/jewellery">Jewellery</NavLink>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border rounded-xl px-4 py-2 outline-none w-[260px] ₹{
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          }`}
        />
      </div>

      <div className="hidden md:flex items-center gap-6">

    
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 rounded-xl bg-blue-950 text-white"
        >
          {darkMode ? "Light" : "Dark"}
        </button>

     
        <NavLink to="/cart">
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center">
              <img
                src={cart}
                alt="cart"
                className="h-7 w-7 object-contain"
              />
              <sup className="text-red-500 font-bold text-sm">
                {cartProducts.length}
              </sup>
            </div>
            <p className="text-sm font-semibold">Cart</p>
          </div>
        </NavLink>

        
        {isLogin ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <FaUserCircle
                className={`text-3xl ₹{
                  darkMode ? "text-white" : "text-blue-950"
                }`}
              />
              <span>Profile</span>
            </button>

            {showProfile && (
              <div
                className={`absolute right-0 mt-3 w-[220px] shadow-2xl rounded-2xl p-4 z-50 ₹{
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
              >
                <button
                  onClick={() => {
                    navigate("/account");
                    setShowProfile(false);
                  }}
                  className="block py-2 hover:text-blue-500 w-full text-left"
                >
                  My Account
                </button>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowProfile(false);
                  }}
                  className="block py-2 hover:text-blue-500 w-full text-left"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("isLogin");
                    localStorage.removeItem("username");
                    navigate("/");
                  }}
                  className="w-full mt-3 bg-red-500 text-white py-2 rounded-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-950 text-white rounded-xl"
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="md:hidden text-2xl"
      >
        {showMenu ? <FaTimes /> : <FaBars />}
      </button>

      {showMenu && (
        <div
          className={`absolute top-[10vh] left-0 w-full shadow-md p-5 flex flex-col gap-4 md:hidden ₹{
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <NavLink onClick={() => setShowMenu(false)} to="/">
            Home
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/men">
            Men
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/women">
            Women
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/kids">
            Kids
          </NavLink>

          <NavLink onClick={() => setShowMenu(false)} to="/jewellery">
            Jewellery
          </NavLink>

          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setShowMenu(false);
            }}
            className="bg-blue-950 text-white py-2 rounded-xl font-semibold"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <NavLink onClick={() => setShowMenu(false)} to="/cart">
            Cart ({cartProducts.length})
          </NavLink>

          {isLogin ? (
            <>
              <NavLink onClick={() => setShowMenu(false)} to="/account">
                My Account
              </NavLink>

              <NavLink onClick={() => setShowMenu(false)} to="/profile">
                Edit Profile
              </NavLink>

              <button
                onClick={() => {
                  localStorage.removeItem("isLogin");
                  localStorage.removeItem("username");
                  setShowMenu(false);
                  navigate("/");
                }}
                className="bg-red-500 text-white py-2 rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
              className="bg-blue-950 text-white py-2 rounded-xl"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;