import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/navbar.css";
import { useStore } from "../../store/Auth";
import { toast } from "react-toastify";
const Navbar = () => {
  const { profilename, toastercontents, isLogin, setlogout, setlogindata } =
    useStore();
  const navigate = useNavigate();


  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message, toastercontents);
      } else {
        toast.error(data.message, toastercontents);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="nav-main">
      <img
        src="/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTE2Ni1wLWwxZGJ1cTN2LnBuZw-removebg-preview.png"
        alt=""
        style={{ height: "80px", background: "none" }}
      />
      <nav className="nav-box">
        {isLogin && isLogin ? (
          <>
            <NavLink to={"/"}>Quotes</NavLink>
            <NavLink to={"/api/user/upload-post"}>post</NavLink>
            <NavLink to={"/api/user/profile"}>Profile</NavLink>
            <a href="">
              {" "}
              <li
                style={{ listStyle: "none", fontWeight: "800" }}
                onClick={() => {
                  logout();
                  setlogout();
                  setlogindata(false);
                }}>
                Logout
              </li>
            </a>
          </>
        ) : (
          <NavLink to={"/api/user/signup"}>signup</NavLink>
        )}
      </nav>
      {isLogin && isLogin && (
        <div className="userId">
          <img src={profilename?.url} alt="" />
          {/* <p className="userid-imgs-text">{profilename?.name}</p> */}
        </div>
      )}
    </header>
  );
};

export default Navbar;
