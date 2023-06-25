import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "../axios";
import MUIStyles from "../components/helpers/setMUIStyles";
import universalStyles from "../styles/Universal.module.scss";

const Register = ({ router }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("register", {
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      })
      .then(async (data) => {
        localStorage.setItem("token", data.data.token);

        await axios
          .get("verify", {
            headers: {
              Authentication: "Bearer " + localStorage.getItem("token"),
            },
          })
          .catch((err) => {
            alert("Something went wrong while sending verification code!");
          });

        router.push("/me/verification-pending");
      })
      .catch((err) => {
        alert(
          err.response.data?.msg ||
            err.response.data[0]?.msg ||
            "Something went wrong in the register process!"
        );
      });
    return res;
  };

  return (
    <div className={universalStyles.rectangle}>
      <h1>Register</h1>
      <form className={universalStyles.rectangle} onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          type="password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          placeholder="repeat password"
        />
        <Button sx={MUIStyles.greyButton} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
