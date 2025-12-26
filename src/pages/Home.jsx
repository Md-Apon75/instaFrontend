import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Feed from "../components/Feed";
import RightHome from "../components/RightHome";
import LeftHome from "../components/LeftHome";
import axios from "axios";
import { serverUrl } from "../App";
import { setStoryData } from "../redux/storySlice";

function Home() {
  const dispatch = useDispatch();
  

  // Fetch stories from backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/story/all`, { withCredentials: true });
        dispatch(setStoryData(res.data));
      } catch (error) {
        console.log("Story fetch error:", error);
      }
    };
    fetchStories();
  }, [dispatch]);

  return (
    <div className="w-full flex justify-center items-start gap-5">
      <LeftHome />
      <Feed />
      <RightHome />
     
    </div>
  );
}

export default Home;
