import { NavLink,useNavigate, } from "react-router-dom";
import { useState , useContext, useEffect} from "react";
import { CartProductContext } from "../../App";
import { FaHeadset,FaGlobe, FaQuestionCircle, FaFileContract,FaBell,FaMoneyBillWave ,FaCreditCard, FaUserCircle,FaLaptop, FaMobileAlt , FaWallet, FaMapMarkedAlt,FaLanguage,FaShieldAlt } from "react-icons/fa";
import axios from "axios";


const Account = () => {

    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const {wishlist, setWishlist} = useContext(CartProductContext);
    const [showOrders, setShowOrders] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showFinance, setShowFinance] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showDevices, setShowDevices] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [addresses, setAddresses] = useState([]);
     const [orders , setOrders] = useState([]);
    const [showLanguage, setShowLanguage] = useState(false);
    const [language, setLanguage] = useState("English");
    const [showNotification, setShowNotification] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showBrowser, setShowBrowser] = useState(false);
    const [showFaq, setShowFaq]  = useState(false);

    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        offers: false,
        deliveryAlerts:true,
        emailNotification:false,
    });

    useEffect(()=>{
       axios.get("https://shopify-ecommerce-lbi0.onrender.com/address")
        .then(({data})=>{
            setAddresses(data);
        })
        .catch((err)=>{
            console.log(err);
        });
       axios.get("https://shopify-ecommerce-lbi0.onrender.com/orders")
        .then(({data})=>{
            setOrders(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);
       
    const [profile, setProfile] = useState({name: username || "",email: "",mobile: "",})
    const [devices, setDevices] = useState([
        {id: 1, name: "Windows Laptop", active: "Last Active: 5 mins", type: "laptop"},
        {id: 2, name: "Android Mobile", active: "Last Active: Today", type: "mobile"},
    ]);
    const handleLogout = ()=>{
        localStorage.removeItem("isLogin");
        localStorage.removeItem("username");
        window.location.href = "/login";
    }
     const removeDevice = (id) =>{
        setDevices(devices.filter((devices)=> devices.id !== id));
    }
  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-8">
        <div className="w-full max-w-[900px] mx-auto bg-white rounded-2xl shadow-lg p-6"> 
            <h1 className="text-3xl font-bold text-blue-950 mb-2">
                My Account </h1>
                <p className="text-neutral-600 mb-6">
                    Welcome,  <b>{username}</b>
                </p>
                <div className="grid grid-cols-1 md:grid-cols gap-5">
                    <div className="shadow-md rounded-xl p-4">
                        <h2 className="text-xl font-bold text-blue-950 mb-3">
                            Shopping
                        </h2>
                        <ul className="space-y-2 font-semibold text-neutral-700">
                            <li>
                                <button onClick={() => setShowOrders(!showOrders)} className="cursor-pointer">
                                  My Orders
                                </button>
                                {showOrders && (
  <div className="mt-4 space-y-4">

    {orders.length === 0 ? (
      <p className="text-gray-500">No Orders Found</p>
    ) : (
      orders.map((order,index)=>(
        <div
          key={index}
          className="p-4 rounded-xl shadow-lg bg-gray-100 text-black"
        >
          <h2 className="text-lg font-bold text-blue-950">
            Order ID: #{order.orderId}
          </h2>

          <p>Status: {order.status}</p>
          <p>Payment: {order.payment}</p>
          <p>Order Date: {order.orderDate}</p>
          <p>Delivery Date: {order.deliveryDate}</p>

          <div className="mt-3 space-y-2">
            {order.products?.map((item)=>(
              <div
                key={item.id}
                className="flex items-center gap-3 bg-white p-2 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />

                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))
    )}

  </div>
)}
  </li>
     <li>
     <button onClick={() => setShowWishlist(!showWishlist)} className="cursor-pointer">
        Wishlist</button>
         {showWishlist && (
        <div className="mt-4 space-y-3">
        {wishlist.length === 0 ? (
        <p className="text-sm text-gray-500" >
         No wishlist items added
          </p>
         ) :(
         wishlist.map((item)=>{
       return(
    <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-3 shadow-md p-3 rounded-xl bg-gray-100">
  <img src={item.thumbnail} alt={item.title} className="h-20 w-20 object-contain" />
  <button onClick={()=> setWishlist(wishlist.filter((p)=>p.id !== item.id))} 
    className="md:ml-auto bg-red-500 text-white px-3 py-1 rounded-lg">Remove</button>
 <div>
<p className="font-semibold">{item.title}</p>
 <p className="text-blue-950 font-bold">₹{item.price}</p>
</div>

</div>
 )
 })
)
 }

  </div>
 )}   
     </li>
           <li>
        <button onClick={() => setShowHelp(!showHelp)} className="cursor-pointer">
                                    
      <FaHeadset className=" text-blue-950 text-xl"/>
       Help Center</button>
     {showHelp && (
     <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-3">
    <h2 className="text-xl font-bold text-blue-950">Customer Support 24*7</h2>
    <p>📞 Customer Care: +91 6371278059 </p>
    <p>📧 Email: support@shopify.com </p>
    <p>🕒 Support Time: 9 AM - 9 PM</p>
 <div>
<h3 className="font-bold mb-2">
    Guidelines
</h3>
 <ul className="list-disc ml-5 space-y-1">

    <li>Products can be returned within 7 days after delivery.</li>
    <li>Please keep the original invoice and product packaging safe.</li>
    <li>Damaged or wrong products can be replaced free of cost.</li>
    <li>Refund amount will be credited within 5-7 working days.</li>
    <li>Do not share your OTP, password or bank details with anyone.</li>
    <li>For payment related issues contact customer support immediately.</li>
    <li>Cash on Delivery is available for selected locations only.</li>
    <li>Delivery time may vary during holidays and festival seasons.</li>
<li>Customers are requested to check product details before placing order.</li>
    <li>For more help contact our 24×7 customer care support.</li>

   </ul>
 </div>
 </div>
)}
</li>
 </ul>
</div>
 <div className="shadow-md rounded-xl p-4">
     <h2 className="text-xl font-bold text-blue-950 mb-3">
     Finance Option
     </h2>
    <ul className="space-y-2 font-semibold text-neutral-700">
     <li>
    <button onClick={() => setShowFinance(!showFinance)} className="cursor-pointer flex-items-center gap-2">
     <FaWallet className="text-green-600"/>
      Finance Details
     </button>
         {showFinance && ( <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-3">
<h2 className="text-xl font-bold text-green-700">
     Finance Information
</h2>
<p>💳 Total Payments: ₹24,500</p>
<p>🛒 Orders Completed: 12</p>
<p>💰 Wallet Balance: ₹1,250</p>
<p>🏦 Payment Method: Cash on Delivery</p>
<p>📅 Last Payment Date: 10 May 2026</p>
<p>🔒 Your payment details are secure and encrypted.</p>
</div>
)}
 </li>
    <li>
  <button onClick={() => setShowCards(!showCards)} className="cursor-pointer flex-items-center gap-2">
       <FaCreditCard className="text-blue-950"/>
             Saved Credit / Debit Cards
 </button>
 {showCards && (
     <div className="mt-4 space-y-4">
          <div className="p-4 rounded-2xl shadow-lg bg-gradient-to-r from-blue-950 to-blue-700 text-white">
              <h2 className="text-lg font-bold">VISA Card</h2>
             <p className="m-2 tracking-widest">**** **** **** 4587</p>
             <div className="flex justify-between mt-4 text-sm">
                <p>Samir Rana</p>
        <p>12/40</p>
      </div>
</div>
 <div className="p-4 rounded-2xl shadow-lg bg-gradient-to-r from-gray-800 to-black text-white">
    <h2 className="text-lg font-bold">Master Card</h2>
 <p className="mt-2 tracking-widest">**** **** **** 7741</p>
 <div className="flex justify-between mt-4 text-sm">
      <p>Samir Rana</p>
      <p>09/30</p>
 </div>
 </div>

                                </div>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setShowPayments(!showPayments)} className="cursor-pointer flex items-center gap-2">
                                <FaMoneyBillWave className="text-green-600"/>
                                Payments & Currencies</button>
                                {showPayments && (
                                    <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-3">
                                        <h2 className="text-xl font-bold text-green-700">Payment Information</h2>
                                        <p> 💵 Preferred Currency: INR (₹)</p>
                                        <p> 💳 Payment Method: Cash on Delivery</p>
                                        <p> 🏦 UPI Payments Supported</p>
                                        <p> 🌍 International Payments Available</p>
                                        <p> 🔒 Secure Encrypted Transactions</p>
                                        <p>📅 Last Payment: ₹2,499 on 10 May 2026</p>

                                    </div>
                                )}
                        </li>
                       </ul>
                    </div>
                    <div className="shadow-md rounded-xl p-4">
                        <h2 className="text-xl font-bold text-blue-950 mb-3">
                             Account Settings
                        </h2>
                        <ul className="space-y-2 font-semibold text-neutral-700">
                            <li>
                            <button onClick={()=> setShowAbout(!showAbout)} className="cursor-pointer flex items-center gap-2">
                                <FaUserCircle className="text-blue-950 text-xl"/>
                                About</button>
                            {showAbout && (
                                <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-3">
                                <h2 className="text-xl font-bold text-blue-950">About Shopify</h2>
                                <p> Shopify is an online shopping platform
                                    where customers can buy Men, Women,
                                    Kids and Jewellery products easily.
                                </p>
                                <p>🛍️ Easy shopping experience with secure payments.</p>
                                <p>🚚 Fast delivery and order tracking available.</p>
                                <p>❤️ Wishlist and cart management supported.</p>
                                <p>🔒 Safe and secure user authentication system.</p>
                                <p>📱 Mobile friendly responsive ecommerce website.</p>
                                <p>🌍 Customers can shop anytime from anywhere.</p>
                                <p>💳 Multiple payment methods supported.</p>
                                <p>📞 24×7 customer support available.</p>
                             </div>
                            )}

                            </li>
                            <li>
                                <button onClick={()=> setShowDevices(!showDevices)} 
                                    className="cursor-pointer flex items-center gap-2">
                                        <FaLaptop className="text-blue-950 text-xl"/>
                                    Manage Devices
                                </button>
                                {showDevices && (
                                    <div>
                                        {devices.map((devices)=>(
                                            <div key={devices.id} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    {devices.type === "laptop" ? (
                                                        <FaLaptop className="text-2xl text-blue-950"/>
                                                    ):(
                                                        <FaMobileAlt className="text-2xl text-green-600"/>
                                                    )
                                                }
                                                <div>
                                                     <p className="font-semibold">{devices.name}</p>
                                                     <p className="text-sm text-gray-500">{devices.active}</p>
                                                </div>
                                                </div>
                                                <button onClick={()=> removeDevice(devices.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                                                    remove
                                                </button>
                            
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                            <li>
                                <NavLink to="/profile">Edit Profile</NavLink>
                            </li>
                            <li>
                                <button onClick={()=> setShowAddress(!showAddress)} className="cursor-pointer flex items-center gap-2">
                                   <FaMapMarkedAlt className="text-red-500 text-xl"/>
                                   Saved Addresses
                                </button>
                                {showAddress && (
                                    <div className="mt-4 space-y-4">
                                         {addresses.length === 0 ? (
                                            <p className="text-gray-500">No saved addresses</p>
                                         ) : (
                                            addresses.map((address)=>(
                                   <div key={address.id} className="bg-gray-100 p-4 rounded-xl shadow-md">
                                            <h2 className="font-bold text-blue-950">{address.name}</h2>
                                              <p>{address.area}</p>
                                              <p>{address.landmark}</p>
                                              <p>Pin:{address.pincode}</p>
                                              <p>Mobile: {address.mobile}</p>
                                    </div>
                                            ))
                                         )
                                        }
                                    </div>
                                )}
                            </li>
                            <li>
                                <button onClick={()=> setShowLanguage(!showLanguage)} className="cursor-pointer flex items-center gap-2">
                                    <FaLanguage className="text-blue-500 text-xl"/> Select Language
                                </button>
                                {showLanguage && (
                                 <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-3">
                                    <h2 className="text-xl font-bold text-blue-950">Choose Language</h2>
                                    <select  value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border p-3 rounded-xl outline-none">
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Odia">Odia</option>
                                        <option value="Telugu">Telugu</option>
                                        </select> 

                                        <p className="font-semibold">Selected Language: {language}</p> 
                                </div>
                                )}
                                
                            </li>
                            <li>
                                <button onClick={()=> setShowNotification(!showNotification)} className="cursor-pointer flex items-center gap-2">
                                    <FaBell className="text-yellow-500 text-xl"/>
                                    Notification Settings
                                </button>

                                {showNotification && (
                                    <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-4">
                                 <h2 className="text-xl font-bold text-blue-950">Notification Settings</h2>
                                 <div className="flex justify-between items-center">
                                    <p>Order Updates</p>
                                    <input type="checkbox" checked={notifications.orderUpdates} onChange={()=>setNotifications({...notifications,orderUpdates: !notifications.orderUpdates,})} />
                         </div>
                         <div className="flex justify-between items-center">
                            <p>Offers & Discounts</p>
                            <input type="checkbox" checked={notifications.offers} onChange={()=> setNotifications({...notifications,offers: !notifications.offers,})} />
                                  
                         </div>
                         <div className="flex justify-between items-center">
                            <p>Delivery Alerts</p>
                        <input type="checkbox" checked={notifications.deliveryAlerts} onChange={()=> setNotifications({...notifications,deliveryAlerts: !notifications.deliveryAlerts,})} />
                         </div>
                          <div className="flex justify-between items-center">
                            <p>Email Notifications</p>
                            <input type="checkbox" checked={notifications.emailNotification} onChange={()=>setNotifications({...notifications,emailNotification: !notifications.emailNotification,})} />
                          </div>
                        </div>
                         )}
                        </li>
                            <li>
                                <button onClick={()=>setShowPrivacy(!showPrivacy)} className="cursor-pointer flex items-center gap-2">
                                    <FaShieldAlt className="text-green-600 text-xl"/>
                                    Privacy Center
                                </button>
                                {showPrivacy && (
                                    <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-3">
                                        <h2 className="text-xl font-bold text-blue-950">Privacy Center</h2>
                                        <p>🔒 Your personal information is secure.</p>
                                        <p>🛡️ Passwords are protected and encrypted.</p>
                                        <p>📱Login activity is monitored for security.</p>
                                        <p>🚫 We never share your private data with third parties.</p>
                                        <p>📧 Email and mobile verification enabled.</p>
                                        <p>🔔 You can control notification permissions anytime.</p>
                                        <p>🌍 Safe shopping and secure payments supported.</p>
                                        <p> ⚠️ Never share OTP or passwords with anyone.</p>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="shadow-md rounded-xl p-4">
                        <h2 className="text-xl font-bold text-blue-950 mb-3">
                            Feedback & Information 
                        </h2>
           <ul className="space-y-2 font-semibold text-neutral-700">
           <li>
            <button onClick={()=> setShowTerms(!showTerms)} className="cursor-pointer flex items-center gap-2">
                <FaFileContract className="text-blue-950 text-xl"/>
                Terms, Policies and Licenses
            </button>
            {showTerms && (
                <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-3">
                    <h2 className="text-xl font-bold text-blue-950">Terms & Policies</h2>
                    <p>📜 All users must follow platform rules and policies.</p>
                    <p>🔒 User account information is kept secure and private.</p>
                    <p>💳 Payments are processed through secure systems.</p>
                    <p>🚚 Delivery dates may vary during holidays or festivals.</p>
                    <p>♻️ Products can be returned within 7 days after delivery.</p>
                    <p>⚠️ Fake orders or misuse of services may lead to account suspension.</p>
                    <p>📄 All product images and content are protected by licenses.</p>
                    <p>🌍 By using this platform, users agree to our terms and conditions.</p>
                </div>
            )}
           </li>
           <li>
            <button onClick={()=>setShowBrowser(!showBrowser)} className="cursor-pointer flex items-center gap-2">
                <FaGlobe className="text-blue-600 text-xl"/>
                Browser</button>
                {showBrowser && (
                    <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-3">
                        <h2 className="text-xl font-bold text-blue-950">Browser Information</h2>
                        <p>🌐 Supported Browsers:</p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Google Chrome</li>
                            <li>Microsoft Edge</li>
                            <li>Mozilla Firefox</li>
                            <li>Safari Browser</li>
                            <li>Opera Browser</li>
                        </ul>
                        <p>⚡Use latest browser version for best performance.</p>
                        <p>🔒 Enable secure browsing for safe payments.</p>
                        <p>📱 Mobile browsers are fully supported.</p>
                        <p>🚀 Fast browsing experience optimized for all devices.</p>
                    </div>
                )}
           </li>
           <li>
             <button onClick={()=> setShowFaq(!showFaq)} className="cursor-pointer flex items-center gap-2">
                <FaQuestionCircle className="text-orange-500 text-xl"/> FAQs
             </button>
              {showFaq && (
                <div className="mt-4 p-4 rounded-xl shadow-lg bg-gray-100 text-black space-y-4">
                    <h2 className="text-xl font-bold text-blue-950">Frequently Asked Questions</h2>
                    <div>
                      <h3 className="font-bold">❓ How can I place an order?</h3>
                      <p>Select products, add them to cart and click Order Now.</p>
                    </div>
                    <div>
                        <h3 className="font-bold">❓Which payment methods are available?</h3>
                        <p>Cash on Delivery, UPI, Debit Card and Credit Card.</p>
                    </div>
                    <div>
                        <h3 className="font-bold">❓ How can I track my order?</h3>
                        <p>Go to My Orders section to check order status.</p>
                    </div>
                    <div>
                        <h3 className="font-bold">❓ Can I return products?</h3>
                        <p>Yes, products can be returned within 7 days.</p>
                    </div>
                    <div>
                        <h3 className="font-bold">❓ How to contact customer support?</h3>
                        <p>Use Help Center or call customer care support.</p>
                    </div>
                </div>
              )}

           </li>
           </ul>
           </div>
           </div>
           <button onClick={handleLogout} className="mt-8 w-full py-3 bg-red-500 text-white font-bold rounded-2xl cursor-pointer hover:bg-red-600 duration-300">
            Logout
           </button>
        </div>
      
    </div>
  )
}

export default Account
