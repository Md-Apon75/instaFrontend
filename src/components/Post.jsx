import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { IoSaveOutline, IoSave } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "../App";
import { setPostData } from "../redux/postSlice";
import { setUserData } from "../redux/userSlice";
import FollowButton from "./FollowButton";
function Post() {
  const { postData } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [commentsInput, setCommentsInput] = useState({});
  const [showComments, setShowComments] = useState({}); 

  const posts = Array.isArray(postData) ? postData : [];

  const handleLike = async (postId) => {
    try {
      const result = await axios.get(`${serverUrl}/api/post/like/${postId}`, {
        withCredentials: true,
      });
      const updatedPost = result.data;
      const updatedPosts = postData.map((p) =>
        p._id === postId ? updatedPost : p
      );
      dispatch(setPostData(updatedPosts));
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (postId) => {
    const message = commentsInput[postId];
    if (!message) return;

    try {
      const result = await axios.post(
        `${serverUrl}/api/post/comment/${postId}`,
        { message },
        { withCredentials: true }
      );

      const updatedPost = result.data;
      const updatedPosts = postData.map((p) =>
        p._id === postId ? updatedPost : p
      );
      dispatch(setPostData(updatedPosts));
      setCommentsInput({ ...commentsInput, [postId]: "" });
      setShowComments({ ...showComments, [postId]: true });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId],
    });
  };
   const handlesaved = async (postId) => {
    try {
      const result = await axios.get(`${serverUrl}/api/post/saved/${postId}`, {
        withCredentials: true,
      });
     dispatch(setUserData(result.data))
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full flex flex-col items-center gap-6 mt-6 pb-10">
      {posts.length === 0 && (
        <div className="text-gray-500 text-xl">No posts yet.</div>
      )}
      {posts.map((post) => (
        <div
          key={post._id}
          className="w-[95%] sm:w-[80%] bg-white rounded-2xl shadow-md flex flex-col items-center"
        >
         
          <div className="w-full flex items-center justify-between p-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={post.author?.profileImage || dp}
                alt=""
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border"
              />
              <span className="font-semibold truncate max-w-[200px]">
                {post.author?.username || "Unknown"}
              </span>
            </div>
            {userData._id!=post.author._id &&<FollowButton tailwind={"px-3 py-1 sm:px-4 sm:py-2 bg-black text-white rounded-2xl text-sm sm:text-base"} targetuserId={post.author._id}/> }
          </div>

   
          <div className="w-full flex justify-center p-2">
            {post.mediaType === "image" ? (
              <img
                src={post.media}
                alt=""
                className="w-full max-w-[400px] rounded-2xl object-cover"
              />
            ) : (
              <video
                src={post.media}
                controls
                className="w-full max-w-[400px] sm:h-[300px] h-[200px] rounded-2xl object-cover"
              />
            )}
          </div>

     
          <div className="w-full flex justify-between items-center px-4 py-2">
            <div className="flex gap-5 items-center">
              <div className="flex gap-2 items-center">
               
                {post.likes.some((id) => id.toString() === userData?._id) ? (
                  <GoHeartFill
                    onClick={() => handleLike(post._id)}
                    className="w-[25px] h-[25px] text-red-600 cursor-pointer"
                  />
                ) : (
                  <GoHeart
                    onClick={() => handleLike(post._id)}
                    className="w-[25px] h-[25px] cursor-pointer"
                  />
                )}

                <span>{post.likes.length}</span>

            
                <div className="flex gap-2 items-center">
                  <MdOutlineComment
                    className="w-[25px] h-[25px] cursor-pointer"
                    onClick={() => toggleComments(post._id)}
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>

  
            <div onClick={handlesaved}>
              {!userData.saved.some((id) => id.toString() === post._id) ? (
                <IoSaveOutline className="w-[25px] h-[25px] cursor-pointer" />
              ) : (
                <IoSave className="w-[25px] h-[25px] cursor-pointer" />
              )}
            </div>
          </div>

       
          {post.caption && (
            <div className="w-full flex gap-2 px-5 py-1">
              <span className="font-semibold">{post.author.username}</span>
              <span>{post.caption}</span>
            </div>
          )}

          <div className="w-full flex flex-col gap-[20px] pb-[20px] px-4">
            <div className="w-full h-[70px] flex items-center gap-3 relative">
              <img
                src={userData?.profileImage || dp}
                alt=""
                className="w-10 h-10 rounded-full object-cover border"
              />

              <input
                type="text"
                placeholder="Add a comment..."
                className="border-b-2 border-gray-400 w-full h-[40px] px-2 outline-none"
                value={commentsInput[post._id] || ""}
                onChange={(e) =>
                  setCommentsInput({
                    ...commentsInput,
                    [post._id]: e.target.value,
                  })
                }
                onFocus={() =>
                  setShowComments({ ...showComments, [post._id]: true })
                }
              />

              <button
                className="absolute right-2 cursor-pointer"
                onClick={() => handleComment(post._id)}
              >
                <IoIosSend className="w-[25px] h-[25px]" />
              </button>
            </div>

            {showComments[post._id] && (
              <div className="w-full max-h-[300px] overflow-auto flex flex-col gap-2">
                {post.comments.map((com) => (
                  <div
                    key={com._id || com.author._id}
                    className="flex gap-2 items-start"
                  >
                    <img
                      src={com.author?.profileImage || dp}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <span className="font-semibold mr-2">
                        {com.author?.username || "Unknown"}
                      </span>
                      <span>{com.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
