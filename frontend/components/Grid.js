import { DataGrid } from "@mui/x-data-grid";
import styles from "../styles/Grid.module.scss";
import setupGridColumns from "./helpers/setupGridColumns";
import setMe from "../setMe";

const Grid = ({
  data,
  queryParams,
  nutrientList,
  userData,
  setUserData,
  loggedIn,
}) => {
  const base = queryParams?.base;
  const nKey = queryParams?.key;

  var nutrients = nutrientList?.slice(); // copy array
  if (nKey === "carb") {
    nutrients?.splice(nutrients.indexOf(nKey), 2);
    nutrients = [nKey, "fiber"].concat(nutrients);
  } else {
    nutrients?.splice(nutrients.indexOf(nKey), 1);
    nutrients = [nKey].concat(nutrients);
  }

  return (
    <DataGrid
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 50,
          },
        },
      }}
      onCellClick={(params, event) => {
        if ((loggedIn && params.field === "fav") || event.stopPropagation()) {
          if (!userData.favourites?.includes(params.row._id)) {
            userData.favourites.push(params.row._id);
          } else {
            userData?.favourites?.splice(
              userData.favourites.indexOf(params.row._id),
              1
            );
          }
          setUserData((prev) => ({
            ...prev,
            favourites: userData.favourites,
          }));
          setMe(userData);
        } else if (!loggedIn && params.field === "fav") {
          alert("You must be logged in to add favourites!");
        }
      }}
      disableColumnResize={false}
      sx={{
        height: "80vh",
        width: "100%",
        cursor: "pointer",
        zIndex: "0",
        textAlign: "center",
        ".MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
      }}
      getRowId={(row) => row._id}
      columns={setupGridColumns(nutrients, base, userData)}
      rows={data}
      disableRowSelectionOnClick
    />
  );
};

export default Grid;
