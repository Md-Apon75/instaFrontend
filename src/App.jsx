import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import getCurrentUser from "./hooks/getCurrentUser";
import getSuggestedUser from "./hooks/getSuggestedUser";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Upload from "./pages/Upload";
import getAllPost from "./hooks/getAllPost";
import getAllLoops from "./hooks/getAllLoops";
import Loops from "./pages/Loops";
import Story from "./pages/Story";
export const serverUrl = "http://localhost:4000";

function App() {
const { userData } = useSelector(state => state.user);

getCurrentUser();
getSuggestedUser();
getAllPost();
getAllLoops();
return (
    <Routes>
        <Route
            path="/signup"
            element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
            path="/signin"
            element={!userData ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
            path="/"
            element={userData ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
            path="/forgotpassword"
            element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
         <Route path="/Story/:username" element={<Story />} />
        <Route
            path="/upload"
            element={userData ? <Upload /> : <Navigate to="/signin" />}
        />
        <Route
            path="loops"
            element={userData ? <Loops/> : <Navigate to="/signin" />}
        />
        
    </Routes>
);

}

export default App;