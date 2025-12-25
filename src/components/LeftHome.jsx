import React from "react";
import { FiHeart } from "react-icons/fi";
import dp from '../assets/dp.webp';
import { useDispatch, useSelector } from 'react-redux';
import axios from  'axios'
import {setUserData} from '../redux/userSlice'
import serverUrl from '../App'
import OtherUser from "./OtherUser";
function LeftHome() {
  const { userData , suggestedUsers} = useSelector((state) => state.user);
    
  const disPatch = useDispatch()
  const handelLogout = async()=>{                   
    const result = await axios.get(`${serverUrl}/api/auth/signout`,
      {withCredentials:true}) 
      disPatch(setUserData(null))
  }
  
  return (
    <div className="w-[25%] hidden lg:block h-[100vh] bg-black border-r-2 border-gray-900 ">

      <FiHeart className="text-white w-[25px] h-[25px] m-4" />

      <div className="flex items-center w-full gap-[10px] px-4">

        <div className="flex items-center w-full gap-[10px] px-[10px] border-b-2 border-b-gray-900 py-[10px]">

        <div className="w-[70px] h-[70px] rounded-full overflow-hidden border">
          <img 
            src={userData?.profileImage || dp} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-[18px] text-white font-semibold">{userData?.name}</div>
          <div className="text-gray-400">{userData?.username}</div>
        </div>
         </div>
         <div className="text-blue-500 font-semibold cursor-pointer" onClick={handelLogout}>Log out</div>
      </div>
       <div className="w-full flex flex-col gap-[20px] p-[20px]">
        <h1 className="text-[white] text-[19px]">Suggested Users</h1>
        {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>(
          <OtherUser key={index} user={user}/>
        ))}
     
       </div>
    </div>
  );
}

export default LeftHome;
