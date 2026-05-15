import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartProductContext } from "../../App";
import { IoTrashBinOutline} from "react-icons/io5";
import logo2 from "../../assets/logo2.png";
import cart from "../../assets/cart.png"
 
const Cart = () => {
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const handleRazorpayPayment = async () => {
  const res = await loadRazorpayScript();

  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const options = {
    key: "rzp_test_SpkAtySJUg3L6Q",

    amount: totalPayableAmount * 100,

    currency: "INR",

    name: "Shoplix",

    description: "Ecommerce Payment",

    handler: function (response) {
      alert("Payment Successful");

      console.log(response);

      localStorage.setItem("paymentStatus", "Paid");

      window.location.href = "/address";
    },

    prefill: {
      name: localStorage.getItem("username") || "Customer",

      email:
        localStorage.getItem("username") ||
        "customer@gmail.com",

      contact: "9999999999",
    },

    theme: {
      color: "#172554",
    },
  };

  const paymentObject = new window.Razorpay(options);

  paymentObject.open();
};


    const { cartProducts , setCartProducts} = useContext(CartProductContext);
    const handleRemoveFromCart = (id) =>{
        setCartProducts(cartProducts.filter((e)=> e.id !== id));
    };
    const updateCart = (type, id)=>{
        setCartProducts((prev)=>{
            if(type === "dec"){
                return prev.map((item)=> item.id === id ? {...item, quantity: item.quantity - 1} : item,) 
                .filter((item)=> item.quantity > 0);
            }
            if(type === "inc"){
                return prev.map((item)=>
                    item.id === id ? {...item, quantity: item.quantity +1} :
                item,
                );
            }
            return prev;
        })
    }

    const totalAmount = cartProducts.reduce(
        (total,item) => total + item.price * item.quantity,0,
    );
    const finalTotal = Math.round(totalAmount * 100)/100;
    const discount = Number((finalTotal / 10).toFixed(2));
    const platformFee = 23;
    const totalPayableAmount = Number(
        (finalTotal - discount + platformFee).toFixed(2),
    );
    if(cartProducts.length == 0){
return (

    <>
    <div className="h-[10vh] px-4 flex justify-between items-center overflow-hidden text-neutral-800 text-2xl bg-white shadow-md">
      <NavLink to={"/"}>
        {/* { <h2 className="font-bold tex,t-3xl"> Shoplix </h2> } */}
        <img className="h-10" src={logo2} alt="logo2" />

      </NavLink>
     <NavLink to={"/cart"}>
     <div className=" flex flex-col justify-center items-center">

     <div  className="flex items-center">

       <img src={cart} alt="cart" className="h-7 w-7 object-contain" />
     
       <sup className="text-red-500 font-bold text-sm">{cartProducts.length}</sup>
     </div>
          
      <p className=" text-sm font-semibold"> Cart  </p>
     </div>
     
     </NavLink>

    </div>
    <div className="h-[90vh] flex flex-col justify-center items-center text-4xl font-semibold">
 <IoTrashBinOutline className="text-red-500"/>
 <h1>Cart is empty</h1>

 <NavLink to="/">
 <p className="p-3 bg-red-500 border-2 border-white rounded-2xl text-lg m-2 text-white hover:bg-white
  hover:text-red-500 hover:border-red-500 duration-300">
    Browse all products
  </p>
 </NavLink>


    </div>


    </>
    
  )
    }

    return (
        <>
         <div className="h-[10vh] px-4 flex justify-between items-center overflow-hidden text-neutral-800 text-2xl bg-white shadow-md">
            <NavLink to={"/"}>
            <img className="h-10" src={logo2} alt="logo2" />
            </NavLink>
            <NavLink to={"/cart"}>
            <div className="flex flex-col justify-center items-center">
           
           <div className="flex items-center">
            <img src={cart} alt="cart" className="h-7 w-7 object-contain" />
             <sup className="text-red-500 font-bold text-sm">{cartProducts.length}</sup>
           </div>
           <p className="font-semibold text-sm"> Cart </p>
                </div>
            </NavLink>

         </div>

         <div className="min-h-[90vh] w-full flex flex-col lg:flex-row">
          
            <div className="min-h-full w-full lg:w-2/3 flex flex-col items-center gap-5 shadow-lg">
            {cartProducts.map(({id,image,title,price,quantity,thumbnail})=>{
                return(
                    <div key={id} className="min-h-[180px] md:h-40 w-[90%] flex flex-col md:flex-row justify-evenly items-center rounded-2xl shadow-md mt-3 p-3 gap-3">
                        <img src={image || thumbnail} alt={title} className="h-24 md:h-32 w-24 md:w-32  object-contain" />
                        <h2 className="text-sm md:text-base font-semibold text-neutral-800  text-center line-clamp-2"> {title}</h2>
                        <b className="text-neutral-800">${((Number(price)||0)* quantity).toFixed(2)}</b>
                        <div className="h-8 w-24 md:w-28 border-2 rounded-2xl flex justify-evenly items-center border-neutral-800 text-md cursor-pointer">
                        <p onClick={() => updateCart("dec", id)}
                         className="h-full w-1/3 flex justify-center items-center">  - </p>
                          <p className="h-full w-1/3 flex justify-center items-center">
                    {quantity}
                  </p>
                  <p
                    onClick={() => updateCart("inc", id)}
                    className="h-full w-1/3 flex justify-center items-center"
                  >
                    +
                  </p>
                        </div>

                        <button
                  onClick={() => handleRemoveFromCart(id)}
                  className="border-2 border-blue-950 px-4 py-2 rounded-3xl text-blue-950 font-semibold hover:bg-blue-950 hover:text-white hover:border-white cursor-pointer duration-300
                w-auto"
                >
                  Remove
                </button>
                    </div>

                )
            })}
          </div>


        <div className="h-auto lg:h-[90vh] w-full lg:w-1/3 text-neutral-800 font-semibold p-3 lg:sticky lg:top-5">
          <p className="flex justify-between items-center p-2">
            <span>Total MRP</span> <span>${finalTotal}</span>
          </p>
          <p className="flex justify-between items-center p-2">
            <span>Discount</span> <span>${discount}</span>
          </p>
          <p className="flex justify-between items-center p-2">
            <span>Platform fee</span> <span>${platformFee}</span>
          </p> <hr />
          <p className="flex justify-between items-center p-2">
            <span className="font-bold">Total amount</span> <span>${totalPayableAmount}</span>
          </p>
          
            <button onClick={handleRazorpayPayment} className="w-full md:w-auto py-3 px-6 m-2 bg-blue-950 text-white font-semibold rounded-2xl float-end cursor-pointer">
              Pay Now
            </button>
        
        </div>
         </div>
        </>
    )
  
}

export default Cart
