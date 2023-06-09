import "../styles/global.scss";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../axios";

export default function App({ Component, pageProps }) {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [nutritionData, setNutritionData] = useState({});

  const router = useRouter();

  const baseList = ["byWeight", "byCalories"];
  const nutrientList = ["carb", "fiber", "protein", "fat"];
  const sortList = ["asc", "desc"];
  const lists = { base: baseList, key: nutrientList, sort: sortList };

  const queryDefaults = {
    description: "",
    base: baseList[1],
    key: nutrientList[2],
    sort: sortList[1],
    page: 0,
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false);
    if (loggedIn) {
      axios
        .get(`/me`, {
          headers: {
            Authentication: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          alert("Error occured while getting user data!");
        });
    }
  }, [loggedIn]);

  return (
    <Container maxWidth="xl">
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        userData={userData}
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
        queryDefaults={queryDefaults}
        lists={lists}
        {...pageProps}
      />
    </Container>
  );
}
