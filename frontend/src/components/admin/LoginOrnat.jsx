import React, { useEffect } from "react";
import { useStore } from "../../store/Auth";
import { Outlet, useNavigate } from "react-router-dom";

const LoginOrnat = () => {
  const navigate = useNavigate();
  const { profilename, isLogin } = useStore();

  useEffect(() => {
    if (!profilename && !isLogin) {
      navigate("/api/user/login");
    }
  }, [profilename, isLogin, navigate]);

  if (profilename || isLogin) {
    return <Outlet />;
  }

  // You could return null, or a spinner/placeholder while redirecting
  return null;
};

export default LoginOrnat;
