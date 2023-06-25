import Button from "@mui/material/Button";
import axios from "../../axios";
import MUIStyles from "../../components/helpers/setMUIStyles";
import universalStyles from "../../styles/Universal.module.scss";

const VerificationPending = ({}) => {
  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .get("verify", {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        alert("Something went wrong while sending verification code!");
      });
  };

  return (
    <div className={universalStyles.rectangle}>
      <h1>We send you verification link! Please check your email.</h1>
      <Button sx={MUIStyles.greyButton} onClick={handleClick}>
        Re-send link
      </Button>
    </div>
  );
};

export default VerificationPending;
