import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export default function getCurrentUser() {
  const dispatch = useDispatch();
 const {storyData} = useSelector(state=>state.story)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );
        if (result.data && result.data.user) {
          dispatch(setUserData(result.data.user));
        } else {
          dispatch(setUserData(null));
        }

      } catch (error) {
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
}
