import "../styles/global.scss";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../axios";

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
    page: 0,
  });

  const router = useRouter();

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false);
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
          alert("Error occured while getting user data!");
        });
    }
  }, [loggedIn]);

  return (
    <Container maxWidth="xl">
      <Head>
        <meta keywords={"nutrio-proportion, nutrition, foods-rating"}></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <title>Nutrio-proportion</title>
      </Head>
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
