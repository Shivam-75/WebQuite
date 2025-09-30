import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/loader.css";
import { useStore } from "../../store/Auth";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../loader/Loader";

const Login = () => {
  const { setisadmin, toastercontents } = useStore();
  const navigate = useNavigate();

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);

  const changehandler = (e) => {
    const { name, value } = e.target;
    setlogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const clckhandler = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(login),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message, toastercontents);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        setisadmin(true);
      } else {
        toast.error(data.message, toastercontents);
      }
    } catch (err) {
      console.log("Login Server error" + err);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            background: "none",
            left: "40%",
            top: "50%",
          }}>
          {" "}
          <Loader />
        </div>
      )}
      <div className="register-main">
        <div className="register-cards">
          <div className="register-logo">
            <h1>Login</h1>
          </div>
          <form onSubmit={clckhandler} className="registration-inputs">
            <div className="register-div">
              <label htmlFor="">Email</label>
              <input
                onChange={changehandler}
                autoComplete="off"
                name="email"
                type="email"
              />
            </div>
            <div className="register-div">
              <label htmlFor="">Password</label>
              <input
                onChange={changehandler}
                autoComplete="off"
                name="password"
                type="password"
              />
            </div>
            <div className="register-button">
              <button type="submit">Login</button>
            </div>
            <div className="register-forget">
              <p>i dont't have account</p>{" "}
              <span
                onClick={() => {
                  navigate("/api/user/signup");
                }}>
                Register
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
