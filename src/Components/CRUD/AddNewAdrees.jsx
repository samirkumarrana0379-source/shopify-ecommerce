import axios from "axios";
import { useState } from "react";

const AddNewAddress = ({ setShowAddAddress, setAddresses, }) => {
  const [address, setAddress] = useState({
  name: "",
  mobile: "",
  area: "",
  landmark: "",
  pincode: "",
  userEmail: localStorage.getItem("username"),
});
  const { name, mobile, area, landmark, pincode } = address;
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] =  useState(false);

  const saveAddress = (e) => {
    e.preventDefault();
    console.log("Save Clicked");
    console.log("Address:", address);
    console.log("IsVerified:", isVerified);

    if (
      name === "" ||
      mobile === "" ||
      area === "" ||
      landmark === "" ||
      pincode === ""
    ) {
      alert("Please fill complete form");
      return;
    }
    
    if (!/^\d{10}₹/.test(mobile)) {
  alert("Mobile number must be exactly 10 digits");
  return;
}

    if(!isVerified){
      alert("Please verify mobile number first");
      return;
    }
      axios
        .post("https://shopify-ecommerce-lbi0.onrender.com/address", address)
        .then(({ data }) => {
          alert("Address saved successfully");
   setAddresses((prev) => {

      const userEmail =
        localStorage.getItem("username");

      const updatedAddresses = [...prev, data];

      return updatedAddresses.filter(
        (address) =>
          address.userEmail === userEmail
      );
    });

    console.log(data);

    setShowAddAddress((prev) => !prev);
  })
        .catch((err) => {
          console.log(err);
        });  
  };
  const handleChange = ({ target: {name, value}}) =>{
    if(name === "mobile"){
      if(!/^\d{0,10}₹/.test(value))
         return;
      
    }
    setAddress({...address, [name]: value});
  };

  const sendOtp =()=>{
    if(mobile.length !==10){
      alert("Enter valid 10 digit mobile number");
      return;
    }
   const newOtp = Math.floor(1000+ Math.random()* 9000).toString();
   setGeneratedOtp(newOtp);
   setIsOtpSent(true);
   alert(`Your OTP is ₹{newOtp}`);

  };

  const verifyOtp = () =>{
    console.log("OTP: " , otp);
    console.log("Generated OTP:" , generatedOtp);

    if(otp === generatedOtp){
      setIsVerified(true);
      alert("Mobile verified successfully");
    }else{
      alert("Invalid OTP");
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-center p-4" >
      <form
        className="w-[90vw] md:w-[50vw] lg:w-[35vw] max-h-[90vh] overflow-y-auto bg-white rounded-xl flex flex-col gap-4 p-5"
        onSubmit={(e) => saveAddress(e)}>
        <h1 className="text-2xl text-neutral-700 font-bold text-center">ADD NEW ADDRESS</h1>
    <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name*"
            value={address.name}
            onChange={(e) => handleChange(e)}
            className="w-full border-b bg-blue-50 outline-none p-3 caret-neutral-500"
          />
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Mobile*"
            value={address.mobile}
            onChange={(e) => handleChange(e)}
            disabled={isVerified}
            className="w-full border-b bg-blue-50 p-3 "
          /> 
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center">
          <button type="button" onClick={sendOtp} className="w-full md:w-auto px-4 py-2 bg-blue-950 text-white rounded-xl">
            Send OTP
          </button>
          {isOtpSent && !isVerified && (
            <>
             <input type="text" placeholder="Enter OTP" value={otp} onChange={(e)=> setOtp(e.target.value)} maxLength={4} 
             className="w-full md:w-[120px] border p-2 rounded-lg outline-none" />
             <button type="button" onClick={verifyOtp} className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-xl">
              Verify OTP
             </button>
            </>
          )}
          {isVerified && (
            <p className="text-green-600 font-bold">Mobile Verified</p>
          )}
        </div>
        <input type="text" name="area" placeholder="Area*" value={area} onChange={handleChange} className="w-full border-b  bg-blue-50 p-3 outline-none" />
        <div className="flex flex-col md:flex-row gap-3">
          <input type="text" name="landmark" placeholder="Landmark*" value={landmark} onChange={handleChange} className="w-full border-b bg-blue-50 p-3 outline-none" />
          <input type="text" name="pincode" placeholder="Pincode" value={pincode} onChange={handleChange} className="w-full border-b bg-blue-50 p-3 outline-none" />
        </div>

        <div className="flex border-t border-neutral-300 pt-3">
          <button type="submit" className="w-1/2 py-3 border-r border-neutral-300 font-semibold">
          SAVE
          </button>
          <button type="button" onClick={() => setShowAddAddress(false)} className="w-1/2 py-3 font-semibold">
            CANCEL
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddNewAddress;

