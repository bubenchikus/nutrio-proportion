import GridHeader from "./GridHeader";
import Grid from "./Grid";

const FullGrid = ({
  queryParams,
  setQueryParams,
  lists,
  loggedIn,
  nutritionData,
  userData,
  setUserData,
}) => {
  return (
    <>
      <GridHeader
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        lists={lists}
        preferences={
          userData?.preferences
            ? {
                description: "",
                base: userData.preferences?.base,
                key: userData.preferences?.key,
                sort: userData.preferences?.sort,
              }
            : {
                description: "",
                base: lists.base[1],
                key: lists.key[2],
                sort: lists.sort[1],
              }
        }
      />
      <Grid
        data={nutritionData}
        queryParams={queryParams}
        nutrientList={lists?.key}
        userData={userData}
        setUserData={setUserData}
        loggedIn={loggedIn}
      />
    </>
  );
};

export default FullGrid;
