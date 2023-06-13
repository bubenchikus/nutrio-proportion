import Button from "@mui/material/Button";

const Favourites = ({ userData, loggedIn }) => {
  if (loggedIn) {
    return <h1>{JSON.stringify(userData?.favourites)}</h1>;
  } else {
    return (
      <>
        <h1>Please log in to view your favourites!</h1>
        <Button>Log in!</Button>
      </>
    );
  }
};

export default Favourites;
