import { useEffect } from "react";
import axios from "../../../axios";

const VerificationRecieved = ({ setLoggedIn, router }) => {
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`/verify/${router.query.token}`)
        .then(() => {
          setLoggedIn(true);
          router.push("/");
        })
        .catch((err) => {
          alert(
            err.res.data?.msg || "Something went wrong in verification process!"
          );
        });
    }
  }, [router.isReady]);
};

export default VerificationRecieved;
