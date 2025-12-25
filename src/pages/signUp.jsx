// SignUp.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice"; // ✅ গুরুত্বপূর্ণ

function SignUp() {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  // Signup function
  const handelSignUp = async () => {
    try {
      if (!name || !username || !email || !password) {
        alert("Please fill all the fields!");
        return;
      }

      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, username, email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data)); 
      console.log(result.data);
      alert("Signup Successful");
      navigate("/signin"); 
    } catch (error) {
      console.log("Signup Error:", error);
      alert("Signup Failed");
    }
  };

  return (
    <div className="bg-black w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full lg:max-w-[60%] h-[600px] bg-amber-50 rounded-2xl flex justify-center items-center overflow-hidden border-2 border-emerald-400 shadow-lg">
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[20px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[22px] font-semibold mt-[40px] text-amber-700">
            <span>Sign Up to</span>
            <span className="text-black">YourApp</span>
          </div>

          {/* Name */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-gray-400"
            onClick={() => setInputClicked({ ...inputClicked, name: true })}
          >
            <label
              htmlFor="name"
              className={`absolute left-[20px] transition-all duration-200 bg-white px-[5px] text-gray-600 ${
                inputClicked.name
                  ? "top-[-10px] text-[13px] text-sky-600"
                  : "top-[12px] text-[15px]"
              }`}
            >
              Enter your name
            </label>
            <input
              type="text"
              id="name"
              className="w-full h-full rounded-2xl px-[20px] outline-none bg-transparent"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Username */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-gray-400"
            onClick={() =>
              setInputClicked({ ...inputClicked, username: true })
            }
          >
            <label
              htmlFor="username"
              className={`absolute left-[20px] transition-all duration-200 bg-white px-[5px] text-gray-600 ${
                inputClicked.username
                  ? "top-[-10px] text-[13px] text-sky-600"
                  : "top-[12px] text-[15px]"
              }`}
            >
              Enter your username
            </label>
            <input
              type="text"
              id="username"
              className="w-full h-full rounded-2xl px-[20px] outline-none bg-transparent"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
          </div>

          {/* Email */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-gray-400"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`absolute left-[20px] transition-all duration-200 bg-white px-[5px] text-gray-600 ${
                inputClicked.email
                  ? "top-[-10px] text-[13px] text-sky-600"
                  : "top-[12px] text-[15px]"
              }`}
            >
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              className="w-full h-full rounded-2xl px-[20px] outline-none bg-transparent"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-gray-400"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`absolute left-[20px] transition-all duration-200 bg-white px-[5px] text-gray-600 ${
                inputClicked.password
                  ? "top-[-10px] text-[13px] text-sky-600"
                  : "top-[12px] text-[15px]"
              }`}
            >
              Enter your password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full h-full rounded-2xl px-[20px] pr-[50px] outline-none bg-transparent"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-[20px] text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="absolute right-[20px] text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Signup Button */}
          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
            onClick={handelSignUp}
          >
            Signup
          </button>

          <p onClick={() => navigate("/signin")} className="cursor-pointer">
            Already have an account? Sign In
          </p>
        </div>

        {/* Right panel */}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-emerald-500 flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl">
          <h2 className="text-[28px] mb-[10px] text-amber-200">Welcome!</h2>
          <p className="text-center px-[30px] text-white/80">
            Create your account to get started with our platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
