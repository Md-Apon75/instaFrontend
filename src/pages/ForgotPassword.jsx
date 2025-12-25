import React, { useState } from "react";
import axios from 'axios'
const serverUrl = "http://localhost:4000"
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handelStep1 = async()=>{
    const result= await axios.post(`${serverUrl}/api/auth/sendOtp`,
      {email},{withCredentials:true})
    console.log(result.data)
    setStep(2)
  }

  const handelStep2 = async()=>{
    const result= await axios.post(`${serverUrl}/api/auth/verifyOtp`,
      {email,otp},{withCredentials:true})
    console.log(result.data)
    setStep(3)
  }

  const handelStep3 = async()=>{
    if(newPassword !== confirmPassword){
      return console.log("password does not match")
    }
    const result= await axios.post(`${serverUrl}/api/auth/resetPassword`,
      {email,password:newPassword},{withCredentials:true})
    console.log(result.data)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">

      {step === 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center">
          <h2 className="font-semibold text-xl mb-4">Forgot Password</h2>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setInputClicked({ ...inputClicked, email: true })}
              onBlur={() => {
                if (!email) setInputClicked({ ...inputClicked, email: false });
              }}
            />
          </div>

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
           onClick={handelStep1}
          >
            Send OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center">
          <h2 className="font-semibold text-xl mb-4">Enter OTP</h2>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-gray-400"
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`absolute left-[20px] transition-all duration-200 bg-white px-[5px] text-gray-600 ${
                inputClicked.otp
                  ? "top-[-10px] text-[13px] text-sky-600"
                  : "top-[12px] text-[15px]"
              }`}
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-full h-full rounded-2xl px-[20px] outline-none bg-transparent"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onFocus={() => setInputClicked({ ...inputClicked, otp: true })}
              onBlur={() => {
                if (!otp) setInputClicked({ ...inputClicked, otp: false });
              }}
            />
          </div>

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
             onClick={handelStep2}
          >
            Verify OTP
          </button>
        </div>
      )}

     
      {step === 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center">
          <h2 className="font-semibold text-xl mb-4">Reset Password</h2>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-gray-400"
            onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}
          >
            <label
              htmlFor="newPassword"
              className={`absolute left-[20px] transition-all duration-200 bg-white px-[5px] text-gray-600 ${
                inputClicked.newPassword
                  ? "top-[-10px] text-[13px] text-sky-600"
                  : "top-[12px] text-[15px]"
              }`}
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full h-full rounded-2xl px-[20px] outline-none bg-transparent"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => setInputClicked({ ...inputClicked, newPassword: true })}
              onBlur={() => {
                if (!newPassword) setInputClicked({ ...inputClicked, newPassword: false });
              }}
            />
          </div>

         
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-gray-400"
            onClick={() => setInputClicked({ ...inputClicked, confirmPassword: true })}
          >
            <label
              htmlFor="confirmPassword"
              className={`absolute left-[20px] transition-all duration-200 bg-white px-[5px] text-gray-600 ${
                inputClicked.confirmPassword
                  ? "top-[-10px] text-[13px] text-sky-600"
                  : "top-[12px] text-[15px]"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full h-full rounded-2xl px-[20px] outline-none bg-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setInputClicked({ ...inputClicked, confirmPassword: true })}
              onBlur={() => {
                if (!confirmPassword) setInputClicked({ ...inputClicked, confirmPassword: false });
              }}
            />
          </div>

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
          onClick={handelStep3}
          >
            Reset Password
          </button>
        </div>
      )}

    </div>
  );
};

export default ForgotPassword;
