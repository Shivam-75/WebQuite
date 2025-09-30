import React, { useEffect, useState } from "react";
import "../../css/card.css";
import Loader from "../loader/Loader";
import { GiCrossedSwords } from "react-icons/gi";
import { CiMedicalCross } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../../store/Auth";
const Card = ({ quitedata, datacross }) => {
  const navigate = useNavigate();
  const [loadingpost, setloadingpost] = useState(false);
  const { toastercontents } = useStore();
  const deleteData = async (datas) => {
    try {
      setloadingpost(true);
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
        }, 2000);
      } else {
        toast.error(data.message, toastercontents);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloadingpost(false);
    }
  };

  return (
    <>
      {quitedata.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "90vmin",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {setTimeout(() => {
            <h1
              style={{
                color: "white",
                fontSize: "40px",
              }}>
              Post Not Found{" "}
            </h1>;
          }, 3000)}
        </div>
      ) : (
        <div className="flex-post">
          {loadingpost && (
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                top: "60%",
                left: "46%",
                background: "none",
              }}>
              <Loader />
            </div>
          )}
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
      )}
    </>
  );
};

export default Card;
