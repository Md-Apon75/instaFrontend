import React, { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dp from '../assets/dp.webp';
import axios from "axios";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";

function EditProfile() {
    const { username } = useParams();
    const { userData } = useSelector(state => state.user);
    const imageInput = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [backendImage, setBackendImage] = useState(null);
    const [frontendImage, setFrontendImage] = useState(userData?.profileImage || dp);

    const [name, setName] = useState(userData?.name || '');
    const [userName, setUserName] = useState(userData?.username || '');
    const [bio, setBio] = useState(userData?.bio || '');
    const [profession, setProfession] = useState(userData?.profession || '');
    const [gender, setGender] = useState(userData?.gender || 'male');

    const handelImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

    const handelEditProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("username", userName); 
            formData.append("bio", bio);
            formData.append("profession", profession);
            formData.append("gender", gender.toLowerCase()); 

            if (backendImage) {
                formData.append("profileImage", backendImage);
            }

            const result = await axios.post(`${serverUrl}/api/user/editprofile`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            });
                console.log("Response from backend:", result.data);
            dispatch(setProfileData(result.data));
            dispatch(setUserData(result.data));

            navigate(`/profile/${userName}`);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Profile update failed. Check console for details.");
        }
    };

    return (
        <div className="w-full min-h-[100vh] bg-black flex flex-col gap-[20px] p-[20px] relative overflow-y-auto items-center">

           
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-0 left-0 bg-black z-[50]">
                <IoMdArrowRoundBack
                    className="text-white w-[25px] h-[25px] cursor-pointer"
                    onClick={() => navigate(`/profile/${userName}`)}
                />
                <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
            </div>

            <div className="h-[80px] w-full"></div>

            {/* Profile Image */}
            <div
                className="w-[70px] h-[70px] rounded-full overflow-hidden border cursor-pointer z-[999]"
                onClick={() => imageInput.current?.click()}
            >
                <input
                    type="file"
                    accept="image/*"
                    ref={imageInput}
                    hidden
                    onChange={handelImage}
                />
                <img
                    src={frontendImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="text-blue-500 text-center text-[18px]">
                Change your profile picture
            </div>

            {/* Input Fields */}
            <input
                type="text"
                className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
                px-[20px] outline-none text-white font-semibold"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <input
                type="text"
                className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
                px-[20px] outline-none text-white font-semibold"
                placeholder="Enter your username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
            />

            <input
                type="text"
                className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
                px-[20px] outline-none text-white font-semibold"
                placeholder="Enter your Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
            />

          
          
            <select
                className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
                px-[20px] outline-none text-white font-semibold"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <input
                type="text"
                className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl 
                px-[20px] outline-none text-white font-semibold"
                placeholder="Enter your profession"
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
            />

            {/* Save Button */}
            <button
                className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white text-black cursor-pointer rounded-2xl"
                onClick={handelEditProfile}
            >
                Save Profile
            </button>

        </div>
    );
}

export default EditProfile;
