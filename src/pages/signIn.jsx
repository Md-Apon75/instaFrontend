// SignIn.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import ForgotPassword from "./ForgotPassword";
function SignIn() {
  const [inputClicked, setInputClicked] = useState({
    username: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handelSignIn = async () => {
    try {
      if (!username || !password) {
        alert("Please fill all the fields!");
        return;
      }

      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { username, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      console.log(result.data);
      alert("Signin Successful");
      navigate("/dashboard"); 
    } catch (error) {
      console.log("Signin Error:", error);
      alert("Signin Failed");
    }
  };

  return (
    <div className="bg-black w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full lg:max-w-[60%] h-[600px] bg-amber-50 rounded-2xl flex justify-center items-center overflow-hidden border-2 border-emerald-400 shadow-lg">
        
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[20px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[22px] font-semibold mt-[40px] text-amber-700">
            <span>Sign In to</span>
            <span className="text-black">YourApp</span>
          </div>

         
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

          <div
            onClick={() => navigate("/forgotpassword")}
            className="text-sky-600 cursor-pointer"
          >
            Forgot password?
          </div>

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
            onClick={handelSignIn}
          >
            Sign In
          </button>

          <p onClick={() => navigate("/signup")} className="cursor-pointer">
            Don't have an account? Sign Up
          </p>
        </div>

        {/* Right panel */}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-emerald-500 flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl">
          <h2 className="text-[28px] mb-[10px] text-amber-200">Welcome!</h2>
          <p className="text-center px-[30px] text-white/80">
            Sign in to access your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
