import axios from "axios";
import { useContext, useEffect,useRef } from "react";
import {NavLink}from "react-router-dom"
import { FaCheckCircle, FaTruck,FaBoxOpen } from "react-icons/fa";
import { CartProductContext } from "../App";



const Order = () => {
  const {cartProducts, setCartProducts} = useContext(CartProductContext);
  const hasSaved = useRef(false);
  
  let orderId = localStorage.getItem("orderId");

  if(!orderId){
     orderId = Math.floor(10000 + Math.random() * 90000);
     localStorage.setItem("orderId" ,orderId);
  }

  const today = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(today.getDate() +5);

  useEffect(()=>{
    if(hasSaved.current) return;
   if(cartProducts.length === 0) return;
    
    hasSaved.current =true;
    const orderData ={
      orderId,
      products: cartProducts,
      payment: "Cash on Delivery",
      status: "Confirmed",
      orderDate: today.toDateString(),
      deliveryDate: deliveryDate.toDateString(),
    };
    axios.post("http://localhost:3000/orders", orderData)
    .then(()=>{
      console.log("order saved in db.json");
      setCartProducts([]);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[]);
  
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-5'>

      <div className="w-[90vw] md:w-[450px] bg-white shadow-xl rounded-2xl p-6 text-center">

 <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4"/>
  <h1 className="text-3xl font-bold text-green-600">
    Order Placed Successfully
  </h1>
  <p className="text-neutral-600 mt-2">Thank you for shopping with us!</p>
  <div className="mt-6 text-left space-y-4 font-semibold text-neutral-700">
    <p>
      <FaBoxOpen className="inline text-blue-950 mr-2"/>
        Order ID: #{orderId} 
    </p>
    <p>
      <FaTruck className="inline text-blue-950 mr-2" />
      Expected Delivery: {deliveryDate.toDateString()}
    </p>
    <p>Payment: Cash on Delivery</p>
    <p>Status: Confirmed</p>
  </div>
  <NavLink to="/">
    <button className="mt-6 w-full py-3 bg-blue-950 text-white font-semibold rounded-2xl cursor-pointer hover:bg-white hover:text-blue-950 border-2 border-blue-900 duration-300">Continue Shopping </button>
  </NavLink>
 


      </div>
    </div>
  )
}

export default Order
