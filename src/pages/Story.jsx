import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
function Story(){
    const {userName} = useParams()
    const handelStory = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/story/getByUserName/${userName}`,{withCredentials:true})
        } catch (error) {
            
        }
    }
    return(
        <div>

        </div>
    )
}
export default Story