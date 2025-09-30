import React, { useEffect, useState } from "react";
import Card from "../../components/Box/Card";
import { useStore } from "../../store/Auth";
import Loader from "../../components/loader/Loader";

const Post = () => {
  const [quiteLoadig, setQuiteLoading] = useState(false);
  const [quites, setquites] = useState([]);
  useEffect(() => {
    const quitedata = async () => {
      try {
        setQuiteLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BASEURL}/getquite`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
        });
        const data = await res.json();

        if (res.ok) {
          setquites(data?.postQuite);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setQuiteLoading(false);
      }
    };
    quitedata();
  }, []);

  return (
    <>
      {quiteLoadig && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            top: "40%",
            left: "46%",
            background:"none"
          }}>
          <Loader />
        </div>
      )}
      <div className="post-flext-data">
        <Card quitedata={quites} />;
      </div>
    </>
  );
};

export default Post;
