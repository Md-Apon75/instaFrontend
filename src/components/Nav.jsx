import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import dp from '../assets/dp.webp';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Nav() {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  console.log("USERDATA →", userData);
  return (
    <div className="w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]">
      <div><IoHomeSharp className="text-white w-[25px] h-[25px]" /></div>
      <div><FaSearch className="text-white w-[25px] h-[25px]" /></div>
      <div onClick={()=>navigate("/upload")}><MdOutlineOndemandVideo className="text-white w-[28px] h-[28px]"/></div > 
      <div onClick={()=>navigate("/loops")}><FaRegPlusSquare className="text-white w-[28px] h-[28px]" /></div>
      <div className="w-[70px] h-[70px] rounded-full overflow-hidden border" onClick={() => userData ? navigate(`/profile/${userData.username}`) : navigate("/signin")}
      >
        <img
          src={userData.profileImage || dp }
          alt=""
          className="w-full h-full object-cover"
          
        />
      </div>
    </div>
  )
}
export default Nav