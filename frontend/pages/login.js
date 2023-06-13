import axios from "../axios";
import { useState } from "react";
import Button from "@mui/material/Button";

const Login = ({ setLoggedIn, router, setUserData }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: "POST",
      url: "login",
      headers: {},
      data: { email: email, password: password },
    })
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        setLoggedIn(true);
        router.push("/");
      })
      .catch((err) => {
        console.warn(err);
        alert("Incorrect user/password!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="formBlock">
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <div>
        <Button type="submit" className="greyButton">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Login;
