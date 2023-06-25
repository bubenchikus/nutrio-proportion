import Button from "@mui/material/Button";
import MUIStyles from "./helpers/setMUIStyles";
import universalStyles from "../styles/Universal.module.scss";

const LoginAlert = ({ warning }) => {
  return (
    <div className={universalStyles.centerAlert}>
      <h1>{warning}</h1>
      <Button sx={MUIStyles.greyButton} href="/login">
        Log in
      </Button>
    </div>
  );
};

export default LoginAlert;
