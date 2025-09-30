import React from "react";
import { useStore } from "../../store/Auth";
import { Outlet, useNavigate } from "react-router-dom";

const LoginOrnat = () => {
  const navigate = useNavigate();
  const { profilename, isLogin } = useStore();
  if (profilename || isLogin) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    navigate("/api/user/login");
  }
};

export default LoginOrnat;
