import Button from "@mui/material/Button";

const LoginAlert = ({ warning }) => {
  return (
    <div className="centerAlert">
      <h1>{warning}</h1>
      <Button className="greyButton" href="/login">
        Log in
      </Button>
    </div>
  );
};

export default LoginAlert;
