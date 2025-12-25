import React from "react";
import dp from "../assets/dp.webp";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function StoryDP({ profileImage, userName, story }) {
const navigate = useNavigate()
  return (
    <div className="flex flex-col w-[80px]">
      <div
        className={`w-[80px] h-[80px] ${story ? "bg-gradient-to-b from-blue-500 to-blue-950" : ""} rounded-full flex items-center justify-center relative`}
      >
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden border">
          <img
            src={profileImage || dp}
            alt=""
            className="w-full h-full object-cover"
          />
          {!story && userName == "your Story" && <div></div>}
          <AiTwotonePlusCircle className="text-black absolute bg-white bottom-[8px] right-[10px] rounded-full w-[22px] h-[22px]"  
          onClick={()=>navigate("/upload")}
          />
        </div>
      </div>
      <div className="text-[14px] text-center truncate w-full text-white">
        {userName}
      </div>
    </div>
  );
}
export default StoryDP;
