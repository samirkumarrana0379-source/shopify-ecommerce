import { useState } from "react"

const Profile = () => {
  const username = localStorage.getItem("username");

  const savedProfile = JSON.parse(localStorage.getItem("profile"));
const [profile, setProfile] = useState(savedProfile || {
  name:username || "",
  email: "",
  mobile: "",
  gender: "",
  image: "",
});
  const handleChange = (e)=>{
    setProfile({
      ...profile,[e.target.name]: e.target.value,
    })
  }
  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = ()=>{
      setProfile({...profile,image: reader.result,})
    }
    reader.readAsDataURL(file);
  }
  const handleSave =(e)=>{
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("profile updated successfully");
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <form onSubmit={handleSave} className="w-[90vw] md:w-[400px] bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4" >

        <h1 className="text-3xl font-bold text-center text-blue-950">Edit Profile</h1>
         <div className="flex flex-col items-center gap-3">
          <img
            src={
              profile.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="h-28 w-28 rounded-full object-cover border-4 border-blue-950 shadow-lg"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm w-full border p-2 rounded-xl"
          />
        </div>

        <input type="text" name="name" placeholder="Full Name" value={profile.name} onChange={handleChange} className="border p-3 rounded-xl outline-none" />
        <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleChange} className="border p-3 rounded-xl outline-none" />
        <input type="text" name="mobile" placeholder="Mobile Number" value={profile.mobile} onChange={handleChange} className="border p-3 rounded-xl outline-none " />
        
        <select name="gender" value={profile.gender} onChange={handleChange} className="border p-3 rounded-xl outline-none">
          <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        </select>
        

        <button className="bg-blue-950 text-white py-3 rounded-xl font-semibold">Save Profile</button>
      </form>
      
    </div>
  )
}

export default Profile
