import { FiHeart } from "react-icons/fi";

import Nav from "./Nav";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { useEffect } from "react";
import axios from "axios";
import { setPostData } from "../redux/postSlice";
import { serverUrl } from "../App";
function Feed() {
  const dispatch = useDispatch();
  const { postData } = useSelector(state => state.post);
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/post/getAll`,{withCredentials:true});
            console.log("API response:", res); 
      console.log("API response data:", res.data);
        dispatch(setPostData(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [dispatch]);

  console.log(postData);

  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      {/* Top bar */}
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <div>
          <FiHeart className="text-white w-[25px] h-[25px] m-4" />
        </div>
        
      </div>

      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav />
        {postData?.map((post, index) => (
          <Post postData={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
