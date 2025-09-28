// context.js
import React, { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [login, setlogindata] = useState(localStorage.getItem("token"));

  const isLogin = !!login;

  const setisadmin = (token) => {
    setlogindata(true);
    return localStorage.setItem("token", token);
  };

  //todo logout====

  const setlogout = () => {
    setlogindata(false);
    return localStorage.removeItem("token");
  };

  const toastercontents = {
    position: "top-right",
    autoClose: 1000,
    theme: "dark",
  };
  const [profilename, setprofilename] = useState();

  const profilenames = async () => {
    const response = await fetch("http://localhost:3000/api/user/userdata", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      setprofilename(data.data);
      setisadmin(true);
    } else {
      console.log(data);
    }
  };
  useEffect(() => {
    profilenames();
  }, [login]);

  const [quiteLoadig, setQuiteLoading] = useState(false);
  const [quites, setquites] = useState([]);
  useEffect(() => {
    const quitedata = async () => {
      try {
        setQuiteLoading(true);
        const res = await fetch("http://localhost:3000/api/user/getquite", {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
        });
        const data = await res.json();

        if (res.ok) {
          setquites(data.postQuite);
        }
      } catch (err) {
        console.log(err);
      }
      finally {
        setQuiteLoading(false);
      }
    };
    quitedata();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        profilename,
        isLogin,
        toastercontents,
        quites,
        setlogout,
        setisadmin,
        quiteLoadig,
      }}>
      {children}
    </StoreContext.Provider>
  );
};

// 3. useStore should NOT be async and must use the correct context
export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
};
