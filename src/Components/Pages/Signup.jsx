import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const Signup = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword:"",
    })

    const navigate = useNavigate();
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

const handleSignup = async (e) => {
  e.preventDefault();

  if (
    user.username === "" ||
    user.password === "" ||
    user.confirmPassword === ""
  ) {
    alert("Please fill complete form");
    return;
  }

  if (user.password !== user.confirmPassword) {
    alert("Password and Confirm Password not matching");
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      user.username,
      user.password
    );

    alert("Account created successfully");
    navigate("/login");
  } catch (err) {
    alert(err.message);
  }
};
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
        <form onSubmit={handleSignup} className="w-[350px] bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-center text-blue-950">Signup</h1>

<input type="text" name="username" placeholder="Create Email " value={user.username} onChange={handleChange} autoComplete="off" className="border p-3 rounded-xl outline-none"/>
<div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={user.password}
    onChange={handleChange}
    autoComplete="new-password"
    className="w-full border p-3 rounded-xl outline-none pr-12"
  />

  {user.password.length > 0 && (

    <span
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
    >

      {showPassword ? (
        <FaEyeSlash size={20} />
      ) : (
        <FaEye size={20} />
      )}

    </span>

  )}

</div>

<div className="relative">

  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={user.confirmPassword}
    onChange={handleChange}
    autoComplete="new-password"
    className="w-full border p-3 rounded-xl outline-none pr-12"
  />

  {user.confirmPassword.length > 0 && (

    <span
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
    >

      {showConfirmPassword ? (
        <FaEyeSlash size={20} />
      ) : (
        <FaEye size={20} />
      )}

    </span>

  )}

</div>
<button className="bg-blue-950 text-white py-3 rounded-xl font-semibold">Signup</button>

<p className="text-sm text-center">Already have account? {""}</p>

<NavLink to="/login" className="text-blue-950 font-bold">Login</NavLink>
        </form>
      
    </div>
  )
}

export default Signup
