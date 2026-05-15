import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartProductContext } from "../../App";

const Men = () => {
  const [products,setProducts] = useState([]);
  const { cartProducts, setCartProducts} = useContext(CartProductContext);

  useEffect(()=>{
   Promise.all([
     axios.get("https://dummyjson.com/products/category/mens-shirts"),
    axios.get("https://dummyjson.com/products/category/mens-shoes"),
    axios.get("https://dummyjson.com/products/category/mens-watches"),
    axios.get("http://localhost:5000/products"),
   ])
   .then(([ shirts , shoes , watches ,backendProducts])=>{
 const menBackendProducts = backendProducts.data
   .filter((product)=> product.category.toLowerCase() === "men")
   .map((product)=>({
     ...product,
     id:product.id,
     thumbnail: product.image,
   }))

    const allProducts = [
      ...shirts.data.products,
      ...shoes.data.products,
      ...watches.data.products,
      ...menBackendProducts,
    ];
    setProducts(allProducts);
   })
   .catch((err)=>{
    console.log(err);
   })
  },[]);

  const addToCart = (product) =>{
    const exists  = cartProducts.some((item) => item.id === product.id);

    if(!exists){
      setCartProducts([...cartProducts, { ...product, quantity:1}]);
    }
  };

  const removeFromCart = (id) =>{
  setCartProducts(cartProducts.filter((item)=> item.id !==id));

  }
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Men Collection</h1>
 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">{products.map((product)=>{
  const isPresent = cartProducts.some(
    (item) => item.id === product.id
  
  )
  return(
    <div key={product.id} className="bg-white shadow-md p-3 rounded-2xl flex flex-col justify-between hover:shadow-xl duration-300">
      <NavLink to={`/product/${product.id}`}>
      <img src={product.thumbnail} alt={product.title}  className="h-32 sm:h-40 md:h-52 w-full object-contain"/>

      <h2 className="font-semibold mt-2 text-xs sm:text-sm md:text-base text-neutral-800 line-clamp-2">{product.title}</h2>

      <p className="text-blue-950 font-bold mt-2 text-sm md:text-lg">${product.price}</p>
</NavLink>
{ isPresent ? (

  <button onClick={()=> removeFromCart (product.id)} className="mt-3 bg-red-500 text-white py-2 rounded-xl cursor-pointer">remove</button>
) :(
  <button onClick={() => addToCart(product)} className="mt-3 bg-blue-950 text-white py-2 rounded-xl cursor-pointer text-xs sm:text-sm">Add to Cart</button>
)}
</div>

  );
 })}</div>

    </div>
  );
};

export default Men
