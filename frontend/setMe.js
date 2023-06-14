import axios from "./axios";

const setMe = async (userData) => {
  if (typeof window !== "undefined") {
    await axios
      .post(`me`, userData, {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while changing user data!");
      });
  }
};

export default setMe;
