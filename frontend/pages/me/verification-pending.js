import Button from "@mui/material/Button";
import axios from "../../axios";

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
        console.warn(err);
        alert("Something went wrong while sending verification code!");
      });
  };

  return (
    <div className="rectangle">
      <h1>We send you verification link! Please check your email.</h1>
      <Button className="greyButton" onClick={handleClick}>
        Re-send link
      </Button>
    </div>
  );
};

export default VerificationPending;
