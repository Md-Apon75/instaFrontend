import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegPlusSquare } from "react-icons/fa";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";
import {setStoryData} from "../redux/storySlice"
import {setLoopData} from "../redux/loopSlice"

function Upload() {
    const [uploadType, setUploadType] = useState("post");
    const navigate = useNavigate();
    const [frontendMedia, setFrontendMedia] = useState(null);
    const [backendMedia, setBackendMedia] = useState(null);
    const mediaInput = useRef();
    const [mediaType, setMediaType] = useState("");
    const [caption, setCaption] = useState("");
    const dispatch = useDispatch()
    const {postData} = useSelector(state=>state.post)
     const {storyData} = useSelector(state=>state.story)
     const {loopData} = useSelector(state=>state.loop)
     const handelMedia = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type.includes("image")) {
            setMediaType("image");
        } else {
            setMediaType("video");
        }

        setBackendMedia(file);
        setFrontendMedia(URL.createObjectURL(file));
    };

    

    const uploadPost = async () => {
        try {
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("mediaType", mediaType);
            formData.append("media", backendMedia);
             console.log("BackendMedia:", backendMedia); // file object
             console.log("Caption:", caption);
            const result = await axios.post(
                `${serverUrl}/api/post/upload`,
                formData,
                { withCredentials: true }
               
            );
            console.log("serverUrl", serverUrl);

             dispatch(setPostData([...postData,result.data]))
            console.log("Post Uploaded:", result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadStory = async () => {
        try {
            const formData = new FormData();
            formData.append("mediaType", mediaType);
            formData.append("media", backendMedia);

            const result = await axios.post(
                `${serverUrl}/api/story/upload`,
                formData,
                { withCredentials: true }
                
            );
                 dispatch(setStoryData([...storyData,result.data]))
            console.log("Story Uploaded:", result.data);
        } catch (error) {
            console.log(error);
        }
    };

   const uploadLoop = async () => {
  try {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("mediaType", mediaType); 
    formData.append("media", backendMedia);

    const result = await axios.post(
      `${serverUrl}/api/loop/upload`,
      formData,
      { withCredentials: true }
    );

    
    dispatch(setLoopData([result.data, ...loopData]));

 
    navigate("/loops");   

  } catch (error) {
    console.log(error);
  }
};


    

   const handelUpload = async () => {
    if (uploadType === "post") await uploadPost();
    else if (uploadType === "story") await uploadStory();
    else await uploadLoop();
};


    return (
        <div className="w-full h-[100vh] bg-black flex flex-col items-center">

            {/* TOP BAR */}
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-0 left-0 bg-black z-[50]">
                <IoMdArrowRoundBack
                    className="text-white w-[25px] h-[25px] cursor-pointer"
                    onClick={() => navigate(`/`)}
                />
                <h1 className="text-white text-[20px] font-semibold">Upload Media</h1>
            </div>

            {/* TYPE SELECTOR */}
            <div className="w-[90%] max-w-[600px] h-[80px] bg-white rounded-full
                flex justify-around items-center gap-[10px] mt-[120px]">

                {/* Post */}
                <div
                    className={`w-[28%] h-[80%] flex justify-center items-center text-[19px] 
                    font-semibold rounded-full cursor-pointer hover:bg-black hover:text-white 
                    ${uploadType === "post" ? "bg-black text-white" : ""}`}
                    onClick={() => setUploadType("post")}
                >
                    Post
                </div>

                {/* Loop */}
                <div
                    className={`w-[28%] h-[80%] flex justify-center items-center text-[19px] 
                    font-semibold rounded-full cursor-pointer hover:bg-black hover:text-white 
                    ${uploadType === "loop" ? "bg-black text-white" : ""}`}
                    onClick={() => setUploadType("loop")}
                >
                    Loop
                </div>

                {/* Story */}
                <div
                    className={`w-[28%] h-[80%] flex justify-center items-center text-[19px] 
                    font-semibold rounded-full cursor-pointer hover:bg-black hover:text-white 
                    ${uploadType === "story" ? "bg-black text-white" : ""}`}
                    onClick={() => setUploadType("story")}
                >
                    Story
                </div>
            </div>

            {/* MEDIA UPLOAD BOX */}
            {!frontendMedia && (
                <div className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1216] border-gray-800 border-2 flex
                flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
                    onClick={() => mediaInput.current.click()}
                >
                    <input type="file" hidden ref={mediaInput} onChange={handelMedia} />
                    <FaRegPlusSquare className="text-white w-[28px] h-[28px]" />
                    <div className="text-white text-[19px] font-semibold">
                        Upload {uploadType}
                    </div>
                </div>
            )}

            {/* MEDIA PREVIEW */}
            {frontendMedia && (
                <div className="w-[80%] max-w-[500px] h-auto flex flex-col items-center mt-[15vh]">

                    {mediaType === "image" && (
                        <img src={frontendMedia} alt="" className="h-[250px] w-auto rounded-2xl" />
                    )}

                    {mediaType === "video" && (
                        <video src={frontendMedia} className="h-[250px] rounded-2xl" controls />
                    )}
                    {(uploadType === "post" || uploadType === "loop") && (
                        <input
                            type="text"
                            className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]"
                            placeholder="Write a caption"
                            onChange={(e) => setCaption(e.target.value)}
                            value={caption}
                        />
                    )}
                    <button className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] 
                        bg-white mt-[40px] cursor-pointer rounded-2xl font-semibold"
                        onClick={handelUpload}>
                        Upload {uploadType}
                    </button>

                </div>
            )}
        </div>
    );
}

export default Upload;
