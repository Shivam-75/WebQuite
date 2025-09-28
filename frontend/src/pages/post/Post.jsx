import React, { useEffect, useState } from "react";
import Card from "../../components/Box/Card";
import { useStore } from "../../store/Auth";
import Loader from "../../components/loader/Loader";

const Post = () => {
  const { quites, quiteLoadig } = useStore();
  console.log(quiteLoadig);
  return (
    <>
      {quiteLoadig ? (
        <Loader />
      ) : (
        <div className="post-flext-data">
          <Card quitedata={quites} />;
        </div>
      )}
    </>
  );
};

export default Post;
