import React, { useEffect, useState } from "react";
import "../../css/story.css";
const Story = () => {
  const [storydata, setstorydata] = useState([]);

  useEffect(() => {
    const datas = async () => {
      try {
        const response = await fetch(
          `${VITE_BASEURL}reguserdata`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setstorydata(data?.response);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    datas();
  }, []);
  return (
    <div className="sss">
      <div className="story-main">
        {storydata.map((data, index) => (
          <div key={index} className="story-items">
            <img src={data.url} alt="" />
            <p>{data.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Story;
