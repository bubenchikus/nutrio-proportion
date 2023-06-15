import { useEffect } from "react";
import axios from "../../../axios";

const VerificationRecieved = ({ router }) => {
  console.log(router.query.token);

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`/verify/${router.query.token}`)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(router.query.token);
        console.warn(err);
        alert(
          err.response.data?.msg ||
            "Something went wrong in verification process!"
        );
      });
  }, [router.isReady]);
};

export default VerificationRecieved;
