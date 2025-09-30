import React, { useEffect, useState } from "react";
import "../../css/profilebox.css";
import Card from "../Box/Card";
import { useStore } from "../../store/Auth";
const Profilebox = () => {
  const [quite, setquite] = useState([]);
  const [count, setcount] = useState();
  const { profilename } = useStore();
  useEffect(() => {
    const userQuites = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASEURL}/getuserQuites`,
        {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setquite(data.userPostes);
        setcount(data.count);
      }
      else {
        console.log(data);
      }
    };
    userQuites();
  }, []);

  return (
    <>
      <div className="profile-main">
        <div className="profile-imgs">
          <img src={profilename?.url} alt="" />
        </div>
        <div className="profile-data">
          <p>Name : {profilename?.name}</p>
          <p>Post :{count}</p>
        </div>
      </div>
      <hr className="profile-line" />
      <Card quitedata={quite} datacross={true} />
    </>
  );
};

export default Profilebox;
