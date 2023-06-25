import { useEffect, useState } from "react";
import FullGrid from "../../components/FullGrid";
import axios from "../../axios";
import LoginAlert from "../../components/LoginAlert";

const Favourites = ({
  queryParams,
  setQueryParams,
  lists,
  loggedIn,
  userData,
  setUserData,
}) => {
  const [favourites, setFavourites] = useState();
  const [favouritesData, setFavouritesData] = useState([]);

  useEffect(() => {
    userData?.favourites?.forEach(async (id) => {
      await axios
        .get(`/nutrition/${id}`)
        .then((response) => {
          setFavouritesData((prev) => [...prev, response.data]);
        })
        .catch((err) => {
          alert("Error occured while getting user data!");
        });
    });
  }, []);

  useEffect(() => {
    setFavourites({
      data: favouritesData,
      dataLength: favouritesData.length,
      pageSize: 10,
    });
  }, [favouritesData]);

  if (loggedIn) {
    return (
      <FullGrid
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        lists={lists}
        loggedIn={loggedIn}
        nutritionData={favourites}
        userData={userData}
        setUserData={setUserData}
      />
    );
  } else {
    return <LoginAlert warning="Please login to view favourites!" />;
  }
};

export default Favourites;
