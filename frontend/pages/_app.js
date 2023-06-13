import "../styles/global.scss";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../axios";

export default function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

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
        {...pageProps}
      />
    </Container>
  );
}
