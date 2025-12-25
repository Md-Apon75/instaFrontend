import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { serverUrl } from "../App";
import { toggleFollow } from "../redux/userSlice";
function FollowButton({targetuserId,tailwind}){
  const {following} = useSelector(state=>state.user)
  const isFollowing = following.includes(targetuserId)
  const dispatch = useDispatch()
  const handelFollow = async()=>{
    try {
      const result = await axios.get(`${serverUrl}/api/user/follow/${targetuserId}`,{withCredentials:true})
    dispatch(toggleFollow(targetuserId))
    } catch (error) {
      console.log(error)
    }
  }

  return(
   <button className={tailwind} onClick={handelFollow}>
     {isFollowing?"Following":"Follow"}
   </button>
)
}
export default FollowButton