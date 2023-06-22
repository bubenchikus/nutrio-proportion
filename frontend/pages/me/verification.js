import Button from "@mui/material/Button";
import axios from "../../axios";

const Verification = ({ router }) => {
  const handleClick = async (e) => {
    e.preventDefault();

    await axios
      .get("verify", {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        router.push("/me/verification-pending");
      })
      .catch((err) => {
        console.warn(err);
        alert("Something went wrong while sending verification code!");
      });
  };

  return (
    <div className="rectangle">
      <h1>Please verify your account email to use full functionality!</h1>
      <Button type="submit" className="greyButton" onClick={handleClick}>
        Receive link
      </Button>
    </div>
  );
};

export default Verification;
