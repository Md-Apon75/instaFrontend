import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setPostData } from "../redux/postSlice";
import { setLoopData } from "../redux/loopSlice";
export default function getAllLoops() {
const dispatch = useDispatch();
const {userData} = useSelector(state=>state.user)
useEffect(() => {
    const fetchLoops = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/loop/getAll`, {
                withCredentials: true
            });
            if (result.data) {
                dispatch(setLoopData(result.data));
            } else {
                dispatch(setPostData([]));
            }
        } catch (error) {
            dispatch(setPostData([]));
        }
    };
    fetchLoops();
}, [dispatch,userData]);

}