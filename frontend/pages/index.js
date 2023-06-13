import styles from "../styles/Index.module.scss";
import axios from "../axios";
import Grid from "../components/Grid";
import GridHeader from "../components/GridHeader";
import { useState, useEffect } from "react";

const Index = ({ userData, setUserData, loggedIn }) => {
  const baseList = ["byWeight", "byCalories"];
  const nutrientList = ["carb", "fiber", "protein", "fat"];
  const sortList = ["asc", "desc"];

  const [nutritionData, setNutritionData] = useState([]);
  const [queryParams, setQueryParams] = useState([
    "",
    baseList[1],
    nutrientList[2],
    sortList[1],
  ]);

  useEffect(() => {
    axios
      .get(
        `/nutrition?description=${queryParams[0]}&base=${queryParams[1]}&key=${queryParams[2]}&sort=${queryParams[3]}`
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
    <>
      <GridHeader
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        baseList={baseList}
        nutrientList={nutrientList}
        sortList={sortList}
        preferences={userData?.preferences}
        loggedIn={loggedIn}
      />
      <Grid
        data={nutritionData}
        queryParams={queryParams}
        nutrientList={nutrientList}
        userData={userData}
        setUserData={setUserData}
        loggedIn={loggedIn}
      />
    </>
  );
};

export default Index;
