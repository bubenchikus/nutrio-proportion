import "../styles/global.scss";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import { useState } from "react";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const baseList = ["byWeight", "byCalories"];
  const nutrientList = ["carb", "fiber", "protein", "fat"];
  const sortList = ["asc", "desc"];

  const lists = { base: baseList, key: nutrientList, sort: sortList };

  const [nutritionData, setNutritionData] = useState([]);
  const [queryParams, setQueryParams] = useState({
    description: "",
    base: baseList[1],
    key: nutrientList[2],
    sort: sortList[1],
  });

  const router = useRouter();

  return (
    <Container maxWidth="xl">
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setUserData={setUserData}
        router={router}
      />
      <Component
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        userData={userData}
        setUserData={setUserData}
        router={router}
        nutritionData={nutritionData}
        setNutritionData={setNutritionData}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        lists={lists}
        {...pageProps}
      />
    </Container>
  );
}
