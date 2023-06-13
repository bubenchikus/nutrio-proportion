import axios from "./axios";

function setMe(userData) {
  if (typeof window !== "undefined") {
    axios
      .post(`/me`, userData, {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while changing user data!");
      });
  }
}

export default setMe;
