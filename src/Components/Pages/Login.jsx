import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const Login = () => {
    const [user, setUser] = useState({
        username:"",
        password:"",
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
    }
   const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(
      auth,
      user.username,
      user.password
    );

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("username", user.username);

    alert("Login Successful");

    navigate("/");
  } catch (err) {
    alert(err.message);
  }
};
   
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
        <form onSubmit={handleLogin} className="w-[350px] bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-center text-blue-950">
                Login
            </h1>
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} autoComplete="off" className="border p-3 rounded-xl outline-none" />
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
            <button className="bg-blue-950 text-white py-3 rounded-xl font-semibold">Login</button>
            <p className="text-sm text-center">
                New user?{" "}
                <NavLink to="/signup" className="text-blue-950 font-bold">Create account</NavLink>
               
            </p>

        </form>
      
    </div>
  )
}

export default Login
