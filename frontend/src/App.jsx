import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Post from "./pages/post/Post";
import Login from "./components/Signup/Login";
import PostForm from "./components/post/Form";
import Register from "./components/Signup/Register";
import Profiles from "./pages/ss/Profiles";
  import { ToastContainer, toast } from "react-toastify";



const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/api/user/profile" element={<Profiles />} />
        <Route path="/api/user/upload-post" element={<PostForm />} />
        <Route path="/" element={<Post />} />
        <Route path="/api/user/signup" element={<Register />} />
        <Route path="/api/user/login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
      />
    </>
  );
};

export default App;
