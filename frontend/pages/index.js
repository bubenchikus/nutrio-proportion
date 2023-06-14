import styles from "../styles/Index.module.scss";
import axios from "../axios";
import FullGrid from "../components/FullGrid";
import { useState, useEffect } from "react";

const Index = ({
  queryParams,
  setQueryParams,
  lists,
  loggedIn,
  userData,
  setUserData,
  nutritionData,
  setNutritionData,
}) => {
  useEffect(() => {
    axios
      .get(
        `/nutrition?description=${queryParams?.description}&base=${queryParams?.base}&key=${queryParams?.key}&sort=${queryParams?.sort}`
      )
      .then((response) => {
        setNutritionData(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting nutrition data!");
      });
  }, [queryParams]);

  useEffect(() => {
    if (loggedIn) {
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
    }
  }, [loggedIn]);

  return (
    <FullGrid
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      lists={lists}
      loggedIn={loggedIn}
      nutritionData={nutritionData}
      userData={userData}
      setUserData={setUserData}
    />
  );
};

export default Index;
