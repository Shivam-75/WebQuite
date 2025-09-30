import React, { useState } from "react";
import "../../css/registration.css";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { useStore } from "../../store/Auth";

const Register = () => {
  const navigate = useNavigate();
  const [laoding, setloading] = useState(false);
  const { toastercontents } = useStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // image: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickHandler = async (e) => {
    e.preventDefault();

    // const body = new FormData();
    // body.append("name", formData.name);
    // body.append("email", formData.email);
    // body.append("password", formData.password);
    // if (formData.image) {
    //   body.append("avatar", formData.image);
    // }

    try {
      setloading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASEURL}/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message, toastercontents);
        setTimeout(() => {
          navigate("/api/user/login");
        }, 2000);
      } else {
        toast.error(data.message, toastercontents);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {laoding && (
        <div
          style={{
            background: "none",
            position: "absolute",
            left: "46%",
            top: "47%",
          }}>
          <Loader />
        </div>
      )}
      <div className="register-main">
        <div className="register-cards">
          <div className="register-logo">
            <h1>Registration</h1>
          </div>
          <form onSubmit={clickHandler} className="registration-inputs">
            <div className="register-div">
              <label htmlFor="">Name</label>
              <input
                name="name"
                type="text"
                autoComplete="off"
                required
                onChange={changeHandler}
              />
            </div>
            <div className="register-div">
              <label htmlFor="">Email</label>
              <input
                name="email"
                type="email"
                autoComplete="off"
                required
                onChange={changeHandler}
              />
            </div>
            <div className="register-div">
              <label htmlFor="">Password</label>
              <input
                name="password"
                type="password"
                autoComplete="off"
                required
                onChange={changeHandler}
              />
            </div>
            {/* <div className="register-div">
              <label htmlFor="">Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={changeHandler}
              />
            </div> */}
            <div className="register-button">
              <button type="submit">Register</button>
            </div>
            <div className="register-forget">
              <p>I have an account</p>
              <span onClick={() => navigate("/api/user/login")}>Login</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
