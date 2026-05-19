import axios from "axios";
import { useEffect ,useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CartProductContext} from "../../App";
import logo2 from '../../assets/logo2.png';
import cart from "../../assets/cart.png";
import { FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";

const Product = () => {
  const { id } = useParams();
  const {  cartProducts, setCartProducts} = useContext(CartProductContext);
  const [state , setState] = useState({
    id:"",
    title:"",
    image:"",
    price: '',
    rating: 0,
    description: "",
   });
   const [reviews, setReviews] = useState([]);
   const [reviewText, setReviewText] = useState("");
  
  useEffect(() => {
  axios
    .get(`https://dummyjson.com/products/₹{id}`)
    .then(({ data }) => {
      setState(data);
    })
    .catch(async () => {
      try {
        const { data } = await axios.get(
          "https://shopify-ecommerce-lbi0.onrender.com/products"
        );

        const foundProduct = data.find(
          (item) => item._id === id
        );

        if (foundProduct) {
          setState({
            ...foundProduct,
            thumbnail: foundProduct.image,
            rating: 4.5,
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
}, [id]);

 const isPresent = cartProducts.some(
  (e) => e.id === state.id || e._id === state._id
);

 const handleAddToCart = () => {
  setCartProducts((prev) => {
    const exists = prev.some(
      (e) => e.id === state.id || e._id === state._id
    );

    return exists ? prev : [...prev, { ...state, quantity: 1 }];
  });
};

 const removeFromCart = (id) => {
  setCartProducts((prev) =>
    prev.filter((prod) => prod.id !== id && prod._id !== id)
  );
};

  return (
  <>
   <div className="h-[10vh] px-4 flex justify-between items-center overflow-hidden text-neutral-800 text-2xl bg-white shadow-md">
    <NavLink to={"/"}>
    {/* { <h2 className="font-bold text-3xl">Shoplix</h2> } */}
    <img className="h-10" src={logo2} alt="logo2" />
    </NavLink>


    <NavLink to={"/cart"}>
    <div className="flex flex-col justify-center items-center">
<div className="flex items-center">
  <img src={cart} alt="cart" className="h-7 w-7 object-contain" />

  <sup className="text-red-500 font-bold text-sm">{cartProducts.length}</sup>

</div>
       <p className="font-semibold">
      Cart 
    </p>
    </div>
    </NavLink>
    
    </div>
<div className="flex flex-col lg:flex-row justify-around items-center gap-6  m-5 min-w-0 bg-white">
  <img src={state.thumbnail} alt={state.title} className="w-full max-w-[400px] h-[350px] object-contain"/>

  <div className="flex flex-col gap-6 w-full lg:w-1/2">
  <h2 className="text-3xl font-bold text-blue-950">{state.title} </h2>

  <p className="text-base md:text-xl text-justify" > {state.description}</p>

  <div className="font-semibold text-neutral-800 flex justify-start items-center">
    Rating: <Stars rating={state.rating || 0}/>
  </div>
  <b className="text-2xl font-bold">₹{state.price}</b>
  {isPresent ? (
    <button className="border-2 font-semibold border-blue-950 p-3 rounded-xl hover:bg-blue-950 hover:text-white hover:border-white cursor-pointer duration-300 " onClick={()=> removeFromCart(state.id || state._id)}> Remove from cart </button>
  ) :(
    <button className="border-2 font-semibold border-blue-950 text-blue-950 p-3 rounded-xl hover:bg-blue-950 hover:text-white hover:border-white cursor-pointer duration-300" onClick={()=> handleAddToCart()}> add to cart</button>

  ) }
  <div className="mt-6 w-full">
    <h2 className="text-xl font-bold text-blue-950 mb-3">Product Reviews</h2>
    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
      placeholder="Write your review..." className="w-full border p-3 rounded-xl outline-none min-h-[120px]"/>
      <button onClick={()=>{
        if(reviewText.trim() === ""){
          alert("Please write review first");
          return;
        }
        setReviews([...reviews, reviewText]);
        setReviewText("");
      }} className="mt-3 bg-blue-950 text-white px-5 py-2 rounded-xl">Add Review</button>

      <div className="mt-4 space-y-2">{
        reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) :(
          reviews.map((reviews, index)=>(
            <p key={index} className="bg-gray-100 p-3 rounded-xl">{reviews}</p>
          ))
        )
      }

      </div>

  </div>
  </div>

</div>

  </> 
  )
}

export default Product

const Stars = ({rating}) =>{
  return (
    <div className="flex">
      {[1,2,3,4,5].map((star)=>{
        if(rating >= star) return <FaStar key={star} color="gold"/>
        if(rating >= star - 0.5)
          return <FaStarHalfAlt key={star} color="gold"/>;
        return <FaRegStar key={star} color="gray"/>
      })}

    </div>
  )
}
