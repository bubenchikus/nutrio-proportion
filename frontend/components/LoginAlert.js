import Button from "@mui/material/Button";
import styles from "../styles/Universal.module.scss";

const LoginAlert = ({ warning }) => {
  return (
    <div className={styles.centerAlert}>
      <h1>{warning}</h1>
      <Button className={styles.greyButton} href="/login">
        Log in
      </Button>
    </div>
  );
};

export default LoginAlert;
