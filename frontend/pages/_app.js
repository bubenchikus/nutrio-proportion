import "../styles/global.scss";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  return (
    <Container maxWidth="xl">
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}
