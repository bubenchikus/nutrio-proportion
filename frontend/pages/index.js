import MainContainer from "../components/MainContainer";
import Container from "@mui/material/Container";
import styles from "../styles/Index.module.scss";
import axios from "../utils/axios.js";
import Grid from "../components/Grid";

const Index = ({ nutrition }) => {
  return (
    <>
      <Container width="lg">
        <MainContainer keywords={", main page"}></MainContainer>
        <Grid data={nutrition} base="byWeight" key="protein" />
      </Container>
    </>
  );
};

export default Index;

export async function getStaticProps(context) {
  const nutrition = await axios.get("/nutrition").then((res) => res.data);
  return { props: { nutrition } };
}
