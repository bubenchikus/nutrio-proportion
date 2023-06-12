import axios from "../axios";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await axios({
      method: "POST",
      url: "login",
      headers: {},
      data: { email: email, password: password },
    }).then((data) => data.data.token);
    localStorage.setItem("token", token);
  };

  const router = useRouter();

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
        <button
          type="submit"
          onClick={() => {
            router.push("/");
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
