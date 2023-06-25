import Button from "@mui/material/Button";
import axios from "../../axios";
import styles from "../../styles/Universal.module.scss";

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
        alert("Something went wrong while sending verification code!");
      });
  };

  return (
    <div className={styles.rectangle}>
      <h1>Please verify your account email to use full functionality!</h1>
      <Button type="submit" className={styles.greyButton} onClick={handleClick}>
        Receive link
      </Button>
    </div>
  );
};

export default Verification;
