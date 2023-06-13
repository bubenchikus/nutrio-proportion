import { useState } from "react";
import Button from "@mui/material/Button";
const Me = ({ userData, loggedIn }) => {
  const [editing, setEditing] = useState(false);

  if (loggedIn) {
    return (
      <>
        <div>My data</div>
        <div>{userData?.email}</div>
        <div>{JSON.stringify(userData?.preferences)}</div>
        <div>{JSON.stringify(userData?.favourites)}</div>
      </>
    );
  } else {
    return (
      <>
        <h1>Please log in to view your data!</h1>
        <Button>Log in!</Button>
      </>
    );
  }
};

export default Me;
