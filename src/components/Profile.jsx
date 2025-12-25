import React, { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { serverUrl } from '../App';
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from '../assets/dp.webp';
import Nav from "./Nav";
import FollowButton from "./FollowButton";

function Profile() {
    const { username } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profileData, userData } = useSelector(state => state.user);

    const handleProfile = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/user/getProfile/${username}`,
                { withCredentials: true }
            );
            dispatch(setProfileData(result.data));
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    
    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
            dispatch(setUserData(null));
            navigate("/signin");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        handleProfile();
    }, [username]);

    return (
        <div className="w-full min-h-screen bg-black">

            {/* Header */}
            <div className="w-full h-[80px] flex justify-between items-center px-[30px] text-white">
                <div onClick={() => navigate("/")}>
                    <IoMdArrowRoundBack className="text-white w-[25px] h-[25px] cursor-pointer" />
                </div>

                <div className="font-semibold text-[20px]">
                    {profileData ? profileData.username || profileData.name : "Loading..."}
                </div>

                <div
                    className="font-semibold cursor-pointer text-[20px] text-blue-600"
                    onClick={handleLogout}
                >
                    Log Out
                </div>
            </div>

            {/* User Info */}
            <div className="w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden border">
                    <img
                        src={profileData?.profileImage || dp}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>  
                <div>
                    <div className="text-white font-semibold text-[22px]">
                        {profileData?.name}
                    </div>
                    <div className="text-[17px] text-[#ffffffe8]">
                        {profileData?.profession || "new user"}
                    </div>
                    <div className="text-[17px] text-white">
                        {profileData?.bio}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-amber-50">

                {/* Posts */}
                <div>
                    <div className="text-white text-[22px] md:text-[30px] font-semibold ">
                        {profileData?.posts?.length}
                    </div>
                    <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">Posts</div>
                </div>

                {/* Followers */}
                <div>
                    <div className="flex items-center justify-center gap-[20px]">
                        <div className="flex relative">
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border">
                                <img src={profileData?.profileImage || dp} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border absolute left-[9px]">
                                <img src={profileData?.profileImage || dp} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border absolute left-[18px]">
                                <img src={profileData?.profileImage || dp} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="text-white text-[22px] font-semibold">
                            {profileData?.followers?.length}
                        </div>
                    </div>
                    <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">Followers</div>
                </div>

                {/* Following */}
                <div>
                    <div className="flex items-center justify-center gap-[20px]">
                        <div className="flex relative">
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border">
                                <img src={profileData?.profileImage || dp} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border absolute left-[9px]">
                                <img src={profileData?.profileImage || dp} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border absolute left-[18px]">
                                <img src={profileData?.profileImage || dp} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="text-white text-[22px] font-semibold">
                            {profileData?.following?.length}
                        </div>
                    </div>
                    <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">Following</div>
                </div>

            </div>

            {/* Edit Profile Button (Only if this is your own profile) */}
            {profileData?._id === userData?._id && (
                <div className="w-full h-[100px] flex justify-center items-center gap-[20px]">
                    <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl"onClick={()=>navigate("/editprofile")}>
                        Edit Profile
                    </button>
                </div>
            )}

        
            {profileData?._id !== userData?._id && (
                <div className="w-full flex justify-center gap-[20px] pb-[30px]">
                    <FollowButton tailwind={"px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl"} targetuserId={profileData?._id}/>
                    <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl">
                        Message
                    </button>
                </div>
            )}
             <div className="w-full min-h-[100vh] flex justify-center">
            <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]">
                <Nav/>

            </div>
             </div>
        </div>
    );
}

export default Profile
