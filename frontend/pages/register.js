import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "../axios";

const Register = ({ setLoggedIn, router }) => {
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
            console.warn(err);
            alert("Something went wrong while sending verification code!");
          });

        router.push("/me/verification-pending");
      })
      .catch((err) => {
        console.warn(err);
        alert(
          err.response.data?.msg ||
            err.response.data[0]?.msg ||
            "Something went wrong in the register process!"
        );
      });
    return res;
  };

  return (
    <div className="rectangle">
      <h1>Register</h1>
      <form className="rectangle" onSubmit={handleSubmit}>
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
        <Button className="greyButton" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
