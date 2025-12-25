import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setSuggestedUsers } from "../redux/userSlice";
export default function getSuggestedUser() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/suggested`,
          { withCredentials: true }
        );
        if (Array.isArray(result.data)) {
          dispatch(setSuggestedUsers(result.data));
        } else {
          dispatch(setSuggestedUsers([]));
        }
      } catch (error) {
        dispatch(setSuggestedUsers([]));
      }
    };

    fetchUser();
  }, [userData]);
}
