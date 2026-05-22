import axios from "axios";
import { useContext,useEffect, useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { CartProductContext } from "../../App";

const Women = () => {
  const [products, setProducts] =  useState([]);

  const { cartProducts , setCartProducts,wishlist, setWishlist} = useContext(CartProductContext);
  const navigate =  useNavigate();
useEffect(()=>{
  Promise.all([
    axios.get( "https://dummyjson.com/products/category/womens-dresses"),
    axios.get("https://dummyjson.com/products/category/womens-bags"),
    axios.get("https://dummyjson.com/products/category/womens-shoes"),
  ])
  .then(([dresses, bags,shoes])=>{
    const allProducts = [...dresses.data.products,
                         ...bags.data.products,
                         ...shoes.data.products,
    ];
    setProducts(allProducts);
  })
  .catch((err)=>{
    console.log(err);
  })
},[])
const addToCart = (product) => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin) {
    navigate("/login");
    return;
  }

  const exists = cartProducts.some((item) => item.id === product.id);

  if (!exists) {
    const updatedCart = [
      ...cartProducts,
      { ...product, quantity: 1 }
    ];

    setCartProducts(updatedCart);

    localStorage.setItem(
      "cartProducts",
      JSON.stringify(updatedCart)
    );
  }
};
const removeFromCart = (id) => {

  const updatedCart = cartProducts.filter(
    (item) => item.id !== id
  );

  setCartProducts(updatedCart);

  localStorage.setItem(
    "cartProducts",
    JSON.stringify(updatedCart)
  );
};
  return (
    <div className="p-5">
    <h1 className="text-3xl font-bold text-center mb-5 text-pink-600">
      Women Collection
    </h1>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
      {products?.map((product)=>{
        const isPresent =  cartProducts.some(
          (item) => item.id === product.id
        )
        return(
          <div key={product.id} className="relative bg-white  shadow-md p-3 rounded-2xl flex flex-col justify-between w-full hover:shadow-xl duration-300">
          <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    const exists = wishlist.some((item) => item.id === product.id);

    if (!exists) {
      setWishlist([...wishlist, product]);
    } else {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    }
  }}
  className="absolute top-3 right-3 text-3xl z-10 bg-white rounded-full p-1 shadow-md"
>
  {wishlist.some((item) => item.id === product.id) ? "❤️" : "🤍"}
</button>
<NavLink to={`/product/${product.id}`}>
<img src={product.thumbnail} alt={product.title} className="h-32 sm:h-40 md:h-52 w-full object-contain" />
<h2 className="font-semibold mt-2 text-xs sm:text-sm md:text-base text-neutral-800 line-clamp-2">{product.title}</h2>
<p className="text-pink-600 font-bold mt-2 text-sm md:text-lg">₹{product.price}</p>
</NavLink>
{isPresent ? (
<button onClick={()=> removeFromCart(product.id)} className="mt-3 bg-red-500 text-white py-2 rounded-xl cursor-pointer">remove</button>
  ) : (
<button onClick={() => addToCart(product)} className="mt-3 bg-pink-600 text-white py-2 rounded-xl cursor-pointer text-xs sm:text-sm">Add to Cart</button>
)
}
</div>
)})}
</div>
</div>
 )
}
export default Women
