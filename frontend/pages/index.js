import Header from "../components/Header";
import Container from "@mui/material/Container";
import styles from "../styles/Index.module.scss";
import axios from "../utils/axios.js";
import Grid from "../components/Grid";
import GridHeader from "../components/GridHeader";
import { useState, useEffect } from "react";

const Index = () => {
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

  return (
    <>
      <Container width="lg">
        <Header keywords={", main page"}></Header>
        <GridHeader
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          baseList={baseList}
          nutrientList={nutrientList}
          sortList={sortList}
        />
        <Grid
          data={nutritionData}
          queryParams={queryParams}
          nutrientList={nutrientList}
        />
      </Container>
    </>
  );
};

export default Index;

// export async function getStaticProps(context) {
//   const nutrition = await axios.get("/nutrition").then((res) => res.data);
//   return { props: { nutrition } };
// }
