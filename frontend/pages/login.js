import axios from "../axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import universalStyles from "../styles/Universal.module.scss";
import MUIStyles from "../components/helpers/setMUIStyles";

const Login = ({ setLoggedIn, router }) => {
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
        if (err.response?.status === 403) {
          router.push("/me/verification");
        } else {
          alert(
            err.response?.data?.msg ||
              err.response?.data[0]?.msg ||
              "Something went wrong in the login process!"
          );
        }
      });
  };

  return (
    <div className={universalStyles.rectangle}>
      <h1>Log in</h1>
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
        <div>
          <Button type="submit" sx={MUIStyles.greyButton}>
            Go!
          </Button>
        </div>
      </form>
      <Link href="/register">
        <Button sx={MUIStyles.greyButton}>Register</Button>
      </Link>
    </div>
  );
};

export default Login;
