import { useState } from "react";
import "../../css/post.css"; // import the CSS file
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useStore } from "../../store/Auth";
import Loader from "../loader/Loader";

export default function PostForm() {
  const navigate = useNavigate();
  const { toastercontents } = useStore();
  const [laoding, setlaodingdata] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setlaodingdata(true);
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/postquite`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message, toastercontents);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log("Post error ", err);
    } finally {
      setlaodingdata(false);
    }
  };

  return (
    <>
      {laoding ? (
        <div style={{ position: "absolute", left:"46%", top:"50%" }}>
          {" "}
          <Loader />
        </div>
      ) : (
        ""
      )}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="post-form">
          <h2>Create a Post</h2>

          {/* Title Input */}
          <label htmlFor="title">Author</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Write Author Name"
            required
          />

          {/* Body Input */}
          <label htmlFor="body">Quote</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write Quote"
            rows="5"
            required
          />

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
