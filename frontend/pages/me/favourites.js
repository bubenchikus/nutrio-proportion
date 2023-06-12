import axios from "../../axios";
import { useState, useEffect } from "react";

const Favourites = () => {
  const [favourites, setFavourites] = useState();

  useEffect(() => {
    axios
      .get(`/me`, {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFavourites(response.data.favourites);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting user data!");
      });
  }, []);

  return <h1>{JSON.stringify(favourites)}</h1>;
};

export default Favourites;
