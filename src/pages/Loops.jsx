import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoopsCard from "../components/LoopsCard"; 
function Loops() {
  const navigate = useNavigate();
  const { loopData } = useSelector((state) => state.loop);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex justify-center items-center">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-0 left-0 bg-black z-[50]">
        <IoMdArrowRoundBack
          className="text-white w-[25px] h-[25px] cursor-pointer"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[20px] font-semibold">Loops</h1>
      </div>

      <div className="h-[100vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {Array.isArray(loopData) &&
          loopData.map((loop, index) => (
            <div className="h-screen snap-start" key={index}>
              <LoopsCard loop={loop} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Loops;
