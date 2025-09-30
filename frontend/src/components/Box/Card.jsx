import React, { useEffect, useState } from "react";
import "../../css/card.css";
import Loader from "../loader/Loader";
import { GiCrossedSwords } from "react-icons/gi";
import { CiMedicalCross } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../../store/Auth";
const Card = ({ quitedata, datacross ,loading}) => {
  const navigate = useNavigate();
  const [deletepost, setdeletepost] = useState(false);
  const { toastercontents } = useStore();
  const deleteData = async (datas) => {
    setdeletepost(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASEURL}/deleteuserQuites/${datas}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message, toastercontents);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(data.message, toastercontents);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setdeletepost(false);
    }
  };

  return (
    <>
      {deletepost && (
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
      <div className="flex-post">
        {quitedata?.map((item, index) => (
          <div key={index} className="card-main">
            {datacross ? (
              <p
                onClick={() => {
                  deleteData(item._id);
                }}
                className="card-iconst">
                {<GiCrossedSwords className="iconst-card" />}
              </p>
            ) : (
              ""
            )}

            <div className="inner-card">
              <h4>{item?.title}</h4>
              <p>{item?.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
