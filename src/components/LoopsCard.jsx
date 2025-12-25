import React, { useEffect, useRef, useState } from "react";
import { FiVolumeX, FiVolume2 } from "react-icons/fi";
import dp from "../assets/dp.webp";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setLoopData } from "../redux/loopSlice";
import axios from "axios";
import { serverUrl } from "../App";

function LoopsCard({ loop }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { loopData } = useSelector((state) => state.loop);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLike = async () => {
    if (!userData?._id) {
      console.log("User not logged in");
      return;
    }

    try {
      const isCurrentlyLiked = loop.likes.includes(userData._id);
      const updatedLikes = isCurrentlyLiked
        ? loop.likes.filter((id) => id !== userData._id)
        : [...loop.likes, userData._id];

      const optimisticLoop = {
        ...loop,
        likes: updatedLikes,
      };

      const optimisticLoops = loopData.map((p) =>
        p._id === loop._id ? optimisticLoop : p
      );
      dispatch(setLoopData(optimisticLoops));

      console.log("Loop ID:", loop._id);
      console.log("API URL:", `${serverUrl}/api/loop/like/${loop._id}`);

      const result = await axios.get(`${serverUrl}/api/loop/like/${loop._id}`, {
        withCredentials: true,
      });

      console.log("Like response:", result.data);

      const updatedloop = result.data;
      const updatedloops = loopData.map((p) =>
        p._id === loop._id ? updatedloop : p
      );
      dispatch(setLoopData(updatedloops));
    } catch (err) {
      console.log("Like error:", err.response?.data || err.message);

      const revertedLoops = loopData.map((p) =>
        p._id === loop._id ? loop : p
      );
      dispatch(setLoopData(revertedLoops));
    }
  };

  const handleCommentClick = () => {
    if (!userData?._id) {
      console.log("User not logged in");
      return;
    }
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = async () => {
    if (!commentMessage.trim()) return;

    try {
      console.log("Posting comment to loop:", loop._id);

      const result = await axios.post(
        `${serverUrl}/api/loop/comment/${loop._id}`,
        { message: commentMessage },
        { withCredentials: true }
      );

      console.log("Comment response:", result.data);

      const updatedLoop = result.data;
      const updatedLoops = loopData.map((p) =>
        p._id === loop._id ? updatedLoop : p
      );
      dispatch(setLoopData(updatedLoops));
      setCommentMessage("");
      setShowCommentInput(false);
    } catch (err) {
      console.log("Comment error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent || 0);
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMute(video.muted);
  };

  const isLikedByUser = userData?._id && loop?.likes?.includes(userData._id);

  return (
    <div className="w-full lg:w-[480px] h-[85vh] flex flex-col justify-end border-l-2 border-r-2 border-gray-800 relative bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMute}
        src={loop?.media}
        className="w-full h-full object-cover"
        onClick={handleClick}
      />

      {/* Mute/Unmute button */}
      <div
        className="absolute top-3 right-3 cursor-pointer z-50"
        onClick={toggleMute}
      >
        {isMute ? (
          <FiVolumeX className="w-[24px] h-[24px] text-white" />
        ) : (
          <FiVolume2 className="w-[24px] h-[24px] text-white" />
        )}
      </div>

      {/* Bottom info + progress */}
      <div className="absolute bottom-0 left-0 w-full bg-black/50">
        {/* Progress bar */}
        <div className="w-full h-[6px] bg-gray-900">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Profile + username + follow button */}
        <div className="flex items-center gap-[10px] p-3">
          <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] border-2 border-white rounded-full overflow-hidden">
            <img
              src={loop?.author?.profileImage || dp}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-white font-semibold truncate flex-1">
            {loop?.author?.userName || loop?.author?.username || loop?.author?.name || "Unknown"}
          </div>

          <FollowButton
            targetuserId={loop?.author?._id}
            tailwind="px-[10px] py-[5px] text-white border-2 border-white text-[14px] rounded-2xl"
          />
        </div>
        <div className="text-white px-3 pb-3">{loop.caption}</div>

        {/* Comment Input Box */}
        {showCommentInput && (
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg outline-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleCommentSubmit();
                  }
                }}
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>
        )}

        <div className="absolute right-0 flex flex-col gap-[20px] text-white bottom-[150px] justify-center px-[10px]">
          <div className="flex flex-col items-center cursor-pointer" onClick={handleLike}>
            {!isLikedByUser ? (
              <GoHeart className="w-[25px] cursor-pointer h-[25px]" />
            ) : (
              <GoHeartFill className="w-[25px] cursor-pointer h-[25px] text-red-600" />
            )}
            <div>{loop?.likes?.length || 0}</div>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={handleCommentClick}>
            <MdOutlineComment className="w-[25px] cursor-pointer h-[25px]" />
            <div>{loop?.comments?.length || 0}</div>
          </div>
        </div>
        {/* Comment List */}
    {loop?.comments?.length > 0 && (
  <div className="px-3 pb-3 max-h-[200px] overflow-y-auto">
    {loop.comments.map((c, index) => (
      <div key={index} className="flex items-start gap-2 mb-2">
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
          <img
            src={c.author?.profileImage || dp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-white">
          <span className="font-semibold">{c.author?.userName || "User"}: </span>
          <span>{c.message}</span>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
}

export default LoopsCard;