import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setPostData } from "../redux/postSlice";
export default function getAllPost() {
const dispatch = useDispatch();
const {userData} = useSelector(state=>state.user)
useEffect(() => {
    const fetchPost = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/post/getAll`, {
                withCredentials: true
            });
            if (result.data) {
                dispatch(setPostData(result.data));
            } else {
                dispatch(setPostData([]));
            }
        } catch (error) {
            dispatch(setPostData([]));
        }
    };
    fetchPost();
}, [dispatch,userData]);

}