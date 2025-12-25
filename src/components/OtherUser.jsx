import React from "react";
import dp from '../assets/dp.webp';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";
function OtherUser({ user }) {
    const { userData } = useSelector((state) => state.user);
   const navigate = useNavigate()
    return (
        <div className="w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800">
            <div className="flex items-center w-full gap-[10px] px-4">
                <div className="flex items-center w-full gap-[10px] px-[10px] border-b-2 border-b-gray-900 py-[10px]">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden border" onClick={()=>navigate(`/profile/${user.username}`)}>
                        <img
                            src={user?.profileImage || dp}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <div className="text-[18px] text-white font-semibold">
                            {user?.name}
                        </div>
                        <div className="text-gray-400">{user?.username}</div>
                    </div>
                </div>
            </div>
            <FollowButton tailwind={"px-[10px] w-[100px] py-[5px] h-[40px] bg-[white] rounded-2xl"} targetuserId={user._id}/>
            
        </div>
    );
}

export default OtherUser;
