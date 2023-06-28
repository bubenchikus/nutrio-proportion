import { useEffect, useState } from "react";
import FullGrid from "../../components/FullGrid";
import axios from "../../axios";
import LoginAlert from "../../components/LoginAlert";

const Favourites = ({
  queryDefaults,
  lists,
  loggedIn,
  userData,
  setUserData,
}) => {
  const [queryParams, setQueryParams] = useState(
    userData.preferences
      ? { ...userData.preferences, description: "", page: 0 }
      : queryDefaults
  );
  const [favouritesData, setFavouritesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData.favourites) {
      setLoading(true);
      axios
        .get(
          `/nutrition/favourites?description=${queryParams?.description}&base=${queryParams?.base}&key=${queryParams?.key}&sort=${queryParams?.sort}&page=${queryParams?.page}`,
          {
            headers: {
              Authentication: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setFavouritesData(res.data);
        })
        .catch((err) => {
          alert("Error occured while getting user data!");
        });
      setLoading(false);
    }
  }, [queryParams]);

  if (loggedIn) {
    return (
      <>
        <FullGrid
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          lists={lists}
          loggedIn={loggedIn}
          nutritionData={favouritesData}
          userData={userData}
          setUserData={setUserData}
          loading={loading}
        />
      </>
    );
  } else {
    return <LoginAlert warning="Please login to view favourites!" />;
  }
};

export default Favourites;
