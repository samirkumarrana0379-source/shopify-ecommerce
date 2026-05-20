import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNewAddress from "./AddNewAdrees";
import UpdateAddress from "./UpdateAddress";

const Address = () => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);
  const [addressId, setAddressId] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("username");

    axios
      .get("https://shopify-ecommerce-lbi0.onrender.com/address")
      .then(({ data }) => {
        const userAddresses = data.filter(
          (address) => address.userEmail === userEmail
        );

        setAddresses(userAddresses);

        if (userAddresses.length > 0) {
          setSelectedAddressId(userAddresses[0]._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

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
      amount: 500 * 100,
      currency: "INR",
      name: "Shopify",
      description: "Order Payment",

      handler: function (response) {
        alert("Payment Successful");

        console.log(response);

        localStorage.setItem("paymentStatus", "Paid");
        localStorage.setItem("selectedAddress", selectedAddressId);

        navigate("/order");
      },

      modal: {
        ondismiss: function () {
          alert("Payment Cancelled");
        },
      },

      prefill: {
        name: localStorage.getItem("username") || "Customer",
        email: localStorage.getItem("username") || "customer@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#172554",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleUpdate = (id) => {
    setAddressId(id);
    setShowUpdateAddress(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    axios
      .delete(`https://shopify-ecommerce-lbi0.onrender.com/address/${id}`)
      .then(() => {
        setAddresses((prev) =>
          prev.filter((address) => address._id !== id)
        );

        if (selectedAddressId === id) {
          setSelectedAddressId(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOrder = async () => {
    if (addresses.length === 0) {
      alert("Please add address first");
      return;
    }

    if (selectedAddressId === null) {
      alert("Please select address first");
      return;
    }

    setLoading(true);
    await handleRazorpayPayment();
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] w-full flex justify-center items-center p-4">
      {showAddAddress && (
        <AddNewAddress
          setShowAddAddress={setShowAddAddress}
          setAddresses={setAddresses}
          setSelectedAddressId={setSelectedAddressId}
        />
      )}

      {showUpdateAddress && (
        <UpdateAddress
          addressId={addressId}
          setShowUpdateAddress={setShowUpdateAddress}
        />
      )}

      <div className="w-[95%] sm:w-[80%] md:w-[60%] lg:w-[45%] flex flex-col justify-start items-center gap-4 shadow-lg p-4 bg-white rounded-xl">
        <div className="w-full flex justify-between items-center p-2">
          <p className="text-xl font-bold text-neutral-800">
            Saved Address
          </p>

          <button
            className="shadow-sm shadow-neutral-400 px-4 py-1 text-blue-950 text-md font-semibold cursor-pointer"
            onClick={() => setShowAddAddress(true)}
          >
            + add new address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center py-10 gap-4">
            <p className="text-lg font-semibold text-neutral-500">
              No Address Found
            </p>

            <button
              className="shadow-sm shadow-neutral-400 px-4 py-2 text-blue-950 font-semibold cursor-pointer"
              onClick={() => setShowAddAddress(true)}
            >
              + Add New Address
            </button>
          </div>
        ) : (
          addresses.map(({ _id, name, mobile, area, landmark, pincode }) => {
            return (
    <div
  key={_id}
  className="w-full bg-white shadow-lg rounded-2xl p-5 flex flex-col gap-3 hover:shadow-2xl duration-300 border border-neutral-200"
>
  
  <div className="flex items-start gap-3">
    
    <input
      type="radio"
      name="address"
      checked={selectedAddressId === _id}
      onChange={() => setSelectedAddressId(_id)}
      className="mt-2"
    />

    <div className="flex-1">

      <h2 className="text-xl font-bold text-blue-950">
        {name}
      </h2>

      <p className="text-neutral-700 mt-1">
        {mobile}
      </p>

      <p className="text-neutral-600 leading-7 mt-2">
        {area},
        <br />
        {landmark},
        <br />
        Pin: {pincode}
      </p>

    </div>
  </div>

  <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200">

    <button
      onClick={() => handleUpdate(_id)}
      className="px-5 py-2 bg-blue-950 text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-blue-800 duration-300"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(_id)}
      className="px-5 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-red-600 duration-300"
    >
      Delete
    </button>

  </div>
</div>
            );
          })
        )}

        <button
          disabled={loading || showAddAddress || showUpdateAddress}
          onClick={handleOrder}
          className="py-3 px-6 bg-blue-950 text-white font-semibold rounded-2xl cursor-pointer disabled:opacity-50"
        >
          {loading ? "Processing..." : "Order Now"}
        </button>
      </div>
    </div>
  );
};

export default Address;