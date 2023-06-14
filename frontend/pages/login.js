import axios from "../axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import Rectangle from "../components/Rectangle";
import Link from "next/link";

const Login = ({ setLoggedIn, router, setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("login", { email: email, password: password })
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
    <div className="rectangle">
      <h1>Log in</h1>
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
        <div>
          <Button type="submit" className="greyButton">
            Go!
          </Button>
        </div>
      </form>
      <Link href="/register">
        <Button className="greyButton">Register</Button>
      </Link>
    </div>
  );
};

export default Login;
