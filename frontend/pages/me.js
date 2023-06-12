import { useState, useEffect } from "react";

import axios from "../axios";

const Me = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get(`/me`, {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting user data!");
      });
  }, []);

  return <h1>{JSON.stringify(userData)}</h1>;
};

export default Me;
