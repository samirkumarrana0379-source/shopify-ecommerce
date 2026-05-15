import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import AddNewAddress from "./AddNewAdrees";
import UpdateAddress from "./UpdateAddress";

const Address = () => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);
  const [addressId, setAddressId] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/address")
      .then(({ data }) => {
        setAddresses(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleUpdate = (id) => {
    setAddressId(id);
    setShowUpdateAddress(true);
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/address/${id}`)
    .then(() => {
      setAddresses(prev => prev.filter(address => address.id !== id));

      if(selectedAddressId === id){
        setSelectedAddressId(null);
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleOrder = () =>{
    if(addresses.length === 0){
      alert("please add address first")
      return;

    }
     if(selectedAddressId === null){
          alert("please select address first")
          return;
    }
        navigate("/order");
    
  };
  return (
    <div className="min-h-[90vh] w-full flex justify-center items-center">
      {showAddAddress && (
        <AddNewAddress setShowAddAddress={setShowAddAddress} setAddresses={setAddresses} />
      )}
      {showUpdateAddress && (
        <UpdateAddress addressId={addressId} setShowUpdateAddress={setShowUpdateAddress} />
      )}
      <div className="h-8/10 w-3/7 flex flex-col justify-start items-center gap-4 shadow-lg pb-2">
        <div className="w-full flex justify-between items-center p-2">
          <p className="text-xl font-bold text-neutral-800">Saved Address</p>
          <NavLink>
            <button
              className="shadow-sm shadow-neutral-400 px-4 py-1 text-blue-950 text-md font-semibold cursor-pointer"
              onClick={() => setShowAddAddress((prev) => !prev)}
            >
              + add new address
            </button>
          </NavLink>
        </div>
        {addresses.map(({ id, name, mobile, area, landmark, pincode }) => {
          return (
            <div
              key={id}
              className="h-35 w-9/10 shadow-md shadow-neutral-400 text-neutral-700 font-semibold flex flex-col justify-between text-sm rounded-xl" >
                <div className="flex items-center gap-2 p-2">
                  <input type="radio" name="address" checked={selectedAddressId === id}  onChange={()=> setSelectedAddressId(id)}/>
                 <h2 className="text-lg font-bold text-neutral-800">{name}</h2>
                </div>

              <h2 className="pl-2">{mobile}</h2>
              <h2 className="pl-2">
                {area}, {landmark}, {pincode}
              </h2>
              <div className="w-full flex border-t border-t-neutral-300 text-blue-950 font-semibold">
                <button
                  className="w-1/2 p-3 border-r border-r-neutral-300 cursor-pointer"
                  onClick={() => handleUpdate(id)}
                >
                  Edit
                </button>
                <button className="w-1/2 p-3 cursor-pointer"
                  onClick={() => handleDelete(id)}>delete</button>
              </div>
            </div>
          );
        })}
        <button disabled={showAddAddress || showUpdateAddress} onClick={handleOrder} className="py-3 px-6 bg-blue-950 text-white font-semibold rounded-2xl cursor-pointer disabled:opacity-50">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Address;