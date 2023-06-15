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
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        setLoggedIn(true);
        router.push("/");
      })
      .catch((err) => {
        alert(err.response.data[0]["msg"]);
      });
    return res;
  };

  return (
    <div className="rectangle">
      <h1>Register</h1>
      <form
        className="rectangle"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
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
