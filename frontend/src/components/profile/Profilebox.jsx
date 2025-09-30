import React, { useEffect, useState } from "react";
import "../../css/profilebox.css";
import Card from "../Box/Card";
import { useStore } from "../../store/Auth";
const Profilebox = () => {
  const [laoding, setlaoding] = useState(false);
  const [quite, setquite] = useState([]);
  const [count, setcount] = useState();
  const { profilename } = useStore();

  const userQuites = async () => {
    setlaoding(true);
    try {
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
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setlaoding(false);
    }
  };

  useEffect(() => {
    userQuites();
  }, []);

  return (
    <>
      <div className="profile-main">
        {/* <div className="profile-imgs">
          <img src={profilename?.url} alt="" />
        </div> */}
        <div className="profile-data">
          <p>Name : {profilename?.name}</p>
          <p>Post :{count}</p>
        </div>
      </div>
      <hr className="profile-line" />
      <Card quitedata={quite} datacross={true} loading={laoding} />
    </>
  );
};

export default Profilebox;
