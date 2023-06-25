import { useState } from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import LoginAlert from "../components/LoginAlert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import setMe from "../setMe";
import axios from "../axios";

const Me = ({
  userData,
  loggedIn,
  setLoggedIn,
  lists,
  queryParams,
  setQueryParams,
  router,
}) => {
  const [editing, setEditing] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .delete("me", {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        router.push("/");
      })
      .catch((err) => {
        alert("Something went wrong while deleting user!");
      });
  };

  if (loggedIn) {
    return (
      <Container maxWidth="md" className="rectangle">
        <h1>My preferences</h1>
        {editing ? (
          <form className="rectangle">
            {Object.keys(userData?.preferences).map((el) => {
              return (
                <div className="dataRow">
                  <div>{el}:</div>
                  <Select
                    size="small"
                    defaultValue={userData["preferences"][el]}
                    onChange={(e) => {
                      userData.preferences[el] = queryParams[el] =
                        e.target.value;
                      setMe(userData);
                      setQueryParams(queryParams);
                    }}
                  >
                    {lists[el]?.map((el) => (
                      <MenuItem value={el} key={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              );
            })}
            <Button
              className="greyButton"
              onClick={() => setEditing(false)}
              type="submit"
            >
              Submit preferences
            </Button>
          </form>
        ) : (
          Object.keys(userData?.preferences).map((el) => {
            return (
              <div className="dataRow">
                <div>{el}:</div>
                <div>{userData?.preferences[el]}</div>
              </div>
            );
          })
        )}

        {editing ? (
          <></>
        ) : (
          <>
            <Button className="greyButton" onClick={() => setEditing(true)}>
              Edit preferences
            </Button>
            <Button
              className="redButton"
              onClick={(e) => {
                if (userData?._id === process.env.NEXT_PUBLIC_TEST_ID) {
                  alert("You can't delete test account!");
                } else {
                  if (
                    confirm("Are you sure you want to delete your account?")
                  ) {
                    handleClick(e);
                  }
                }
              }}
            >
              Delete account
            </Button>
          </>
        )}
      </Container>
    );
  } else {
    return <LoginAlert warning="Please login to view user data!" />;
  }
};

export default Me;
