import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

const Rectangle = ({ contains }) => {
  return (
    <Container>
      <div className="rectangle">{contains}</div>
    </Container>
  );
};

export default Rectangle;
