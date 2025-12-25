import React from "react";
import Feed from "../components/feed";
import RightHome from "../components/rightHome";
import LeftHome from "../components/LeftHome";

function Home (){
    return(
        <>
         <div className="w-full flex justify-center items-center">
            <LeftHome/>
            <Feed/>
            <RightHome/>
            
         </div>
        </>
       

    )
}
export default Home