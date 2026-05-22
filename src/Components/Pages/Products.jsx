import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {NavLink} from "react-router-dom";
import {FaRegStar, FaStar, FaStarHalfAlt,FaHeart} from "react-icons/fa";
import {CartProductContext} from "../../App";



const Products = () => {
    const { cartProducts , setCartProducts,search,wishlist, setWishlist} = useContext(CartProductContext);
    const [ state , setState] = useState([]);
   const [categoryFilter, setCategoryFilter] = useState("all");
   const [priceFilter, setPriceFilter] = useState(1000);
   const [ratingFilter, setRatingFilter] = useState(0);
    
    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products")
        .then(({data})=>{
            setState(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);
const filteredProducts = state.filter((item) => {
  return (
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "all" || item.category === categoryFilter) &&
    item.price <= priceFilter &&
    item.rating.rate >= ratingFilter
  );
});

    const addToCart = (id, image , title, price)=>{
        setCartProducts((prev)=>{
            const exists = prev.some((e)=> e.id == id);
            return exists
            ? prev
            : [...prev, {id , image, title, price , quantity: 1}];
        });
    };
    const removeFromCart = (id)=>{
        setCartProducts((prev)=>{
            return prev.filter((e)=> e.id !=id);
        });
    };

    const handleWishlist = (Product) =>{
        const exists = wishlist.some((item)=> item.id === Product.id);
        if(exists){
            setWishlist(wishlist.filter((item)=> item.id !== Product.id));
        } else{
            setWishlist([...wishlist, Product]);
        }
    }
  return (
    <>
<div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-xl m-4">

  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="border p-2 rounded-xl"
  >
    <option value="all">All Categories</option>
    <option value="men's clothing">Men</option>
    <option value="women's clothing">Women</option>
    <option value="jewelery">Jewellery</option>
    <option value="electronics">Electronics</option>
  </select>

  <div className="flex flex-col">
    <label>Max Price: ₹{priceFilter}</label>

    <input
      type="range"
      min="0"
      max="1000"
      value={priceFilter}
      onChange={(e) => setPriceFilter(e.target.value)}
    />
  </div>

  <select
    value={ratingFilter}
    onChange={(e) => setRatingFilter(e.target.value)}
    className="border p-2 rounded-xl"
  >
    <option value="0">All Ratings</option>
    <option value="1">1+ Rating</option>
    <option value="2">2+ Rating</option>
    <option value="3">3+ Rating</option>
    <option value="4">4+ Rating</option>
  </select>

</div>

    <div className="bg-white grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5 p-3 md:p-5">
        {filteredProducts. length === 0 && (
            <h1 className="col-span-full text-center text-2xl font-bold text-red-500">No products found</h1>
        )}
        {filteredProducts.map(({id,title,price,image,rating})=>{
            return(
                <div key={id} className="font-semibold text-center rounded-2xl bg-white flex flex-col justify-between p-2 shadow-neutral-400 shadow-md">
                    <NavLink to={`/product/${id}`}>
                    <button
  onClick={(e) => {
    e.preventDefault();

    handleWishlist({
      id,
      title,
      price,
      image,
    });
  }}
  className="flex justify-end w-full mb-2"
>
  <FaHeart
    className={`text-2xl ${
      wishlist.some((item) => item.id === id)
        ? "text-red-500"
        : "text-gray-400"
    }`}
  />
</button>
    <img className="h-24 md:h-40 lg:h-52 w-full object-contain " src={image || null} alt="" />
    <p className="text-[11px] md:text-base truncate text-neutral-900">{title}</p>
   <div className="flex flex-col md:flex-row justify-between items-center py-2 text-[11px] md:text-sm">
    <p className="text-neutral-800">Price : ₹{price}</p>
    <div>
    <Stars rating = {rating.rate}/>
</div>
</div>
</NavLink>
{cartProducts.some((e)=> e.id == id) ? (
    <button className="h-10 w-full py-1 text-blue-950 px-3 rounded-2xl border-2 border-green-950 hover:border-white cursor-pointer
     hover:text-white duration-300 " onClick={()=> removeFromCart(id)}>remove</button>
 ):(
<button className="h-10 w-full py-1 text-blue-950 px-3 rounded-2xl border-2 border-blue-950 hover:bg-blue-950 hover:border-white cursor-pointer hover:text-white duration-300" 
onClick={()=> addToCart(id, image, title, price)}> add 
</button>
)}
</div>
)})}
</div>
</>
  )
}
export default Products
 
const Stars = ({ rating}) =>{
    return(
       <div className="flex">
       {[1,2,3,4,5].map((star)=>{
        if (rating >= star ) return <FaStar key={star} color="gold"/>;
        if(rating >= star - 0.5)
            return <FaStarHalfAlt key={star} color="gold"/>
        return <FaRegStar key={star} color="gray"/>;
       })}
       
       </div>
    )
}
