import axios from "axios";
import { useEffect, useState } from "react";

const UpdateAddress = ({ addressId, setShowUpdateAddress }) => {
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    area: "",
    landmark: "",
    pincode: "",
  });
  const { name, mobile, area, landmark, pincode } = address;
  const [otp, setOtp] = useState("");
  const [generatedOtp , setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified , setIsVerified] = useState(false);
  const [oldMobile, setOldMobile] = useState("");
  useEffect(() => {
    axios
      .get(`https://shopify-ecommerce-lbi0.onrender.com/address/${addressId}`)
      .then(({ data }) => {
        setAddress(data);
        setOldMobile(data.mobile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addressId]);
  const updateAddress = (e) => {
    e.preventDefault();
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

     if (!/^\d{10}$/.test(mobile)) {
    alert("Mobile number must be exactly 10 digits");
    return;
  }

 if (mobile !== oldMobile && !isVerified) {
  alert("Please verify mobile number first");
  return;
}

      axios
        .put(`https://shopify-ecommerce-lbi0.onrender.com/address/${addressId}`, address)
        .then(({ data }) => {
          console.log(data);
          setShowUpdateAddress((prev) => !prev);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleChange = ({ target: { name, value } }) => {
    setAddress({ ...address, [name]: value });
  };

  const sendOtp = () => {
  if (mobile.length !== 10) {
    alert("Enter valid 10 digit mobile number");
    return;
  }

  const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
  setGeneratedOtp(newOtp);
  setIsOtpSent(true);
  alert(`Your OTP is ${newOtp}`);
};

const verifyOtp = () => {
  if (otp === generatedOtp) {
    setIsVerified(true);
    alert("Mobile verified successfully");
  } else {
    alert("Invalid OTP");
  }
};
  return (
    <div
      className="h-screen w-full flex justify-center items-center z-50 fixed top-0
      inset-0 bg-black/40"
    >
      <form
        className="w-[90vw] md:w-[50vw] max-h-[90vh] overflow-y-auto bg-white rounded-xl flex flex-col gap-4 p-5  "
        onSubmit={(e) => updateAddress(e)}
      >
        <h1 className="text-xl text-neutral-700 font-bold">Update ADDRESS</h1>
        <div
          className="flex flex-col md:flex-row gap-3 w-full"
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name*"
            value={address.name}
            onChange={(e) => handleChange(e)}
            className="w-full border-b border-neutral-500 outline-none p-2"
          />
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Mobile*"
            value={address.mobile}
            onChange={(e) => handleChange(e)}
            disabled={isVerified}
            className="w-full border-b border-neutral-500 outline-none p-2" />
          <button type="button" onClick={sendOtp} className="bg-blue-950 text-white px-4 py-2 rounded-lg">
  Send OTP
</button>

{isOtpSent && (
  <>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      maxLength={4}
    />

    <button type="button" onClick={verifyOtp}>
      Verify OTP
    </button>
  </>
)}

{isVerified && <p className="text-green-600">Mobile Verified </p>}
        </div>
        <div
          className="h-20 w-full font-semibold text-neutral-700 flex justify-center
          items-center"
        >
          <input
            type="text"
            name="area"
            id="area"
            placeholder="Area*"
            value={address.area}
            onChange={(e) => handleChange(e)}
            className="w-full border-b border-neutral-500 outline-none p-2"
          />
        </div>
        <div
          className="flex flex-col md:flex-row gap-3 w-full"
        >
          <input
            type="text"
            name="landmark"
            id="landmark"
            placeholder="Landmark*"
            value={address.landmark}
            onChange={(e) => handleChange(e)}
            className="w-full border-b border-neutral-500 outline-none p-2"
          />
          <input
            type="text"
            name="pincode"
            id="pincode"
            placeholder="Pincode*"
            value={address.pincode}
            onChange={(e) => handleChange(e)}
            className="w-full border-b border-neutral-500 outline-none p-2"
          />
        </div>
        <div
          className="h-12 w-full flex justify-center items-center border-t border-neutral-500
          text-md text-neutral-600 font-semibold"
        >
          <button className="h-full w-1/2 border-r border-neutral-500 cursor-pointer">
            SAVE
          </button>
          <button
            className="h-full w-1/2 cursor-pointer"
            type="button"
            onClick={() => setShowUpdateAddress((prev) => !prev)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAddress;