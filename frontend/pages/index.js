import axios from "../axios";
import FullGrid from "../components/FullGrid";
import { useEffect, useState } from "react";

const Index = ({
  queryDefaults,
  lists,
  loggedIn,
  userData,
  setUserData,
  nutritionData,
  setNutritionData,
  loading,
  setLoading,
}) => {
  const [queryParams, setQueryParams] = useState(queryDefaults);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/nutrition?description=${queryParams?.description}&base=${queryParams?.base}&key=${queryParams?.key}&sort=${queryParams?.sort}&page=${queryParams?.page}`
      )
      .then((res) => {
        setNutritionData(res.data);
      })
      .catch((err) => {
        alert("Error occured while getting nutrition data!");
      });
    setLoading(false);
  }, [queryParams]);

  return (
    <FullGrid
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      lists={lists}
      loggedIn={loggedIn}
      nutritionData={nutritionData}
      userData={userData}
      setUserData={setUserData}
      loading={loading}
    />
  );
};

export default Index;
