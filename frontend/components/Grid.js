import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import setupGridColumns from "./helpers/setupGridColumns";
import setMe from "../setMe";
import SyncLoader from "react-spinners/SyncLoader";

const Grid = ({
  data,
  queryParams,
  setQueryParams,
  nutrientList,
  userData,
  setUserData,
  loggedIn,
  loading,
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

  if (loading) {
    return (
      <div className="centerAlert">
        <SyncLoader color="grey" />
      </div>
    );
  } else if (!data?.data) {
    <div className="rectangle">
      <h1>No data available!</h1>
    </div>;
  } else {
    return (
      <>
        <DataGrid
          onCellClick={(params, event) => {
            if (
              (loggedIn && params.field === "fav") ||
              event.stopPropagation()
            ) {
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
          sx={{
            width: "100%",
            cursor: "pointer",
            zIndex: "0",
            textAlign: "center",
            ".MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
          }}
          getRowId={(row) => row._id}
          columns={setupGridColumns(nutrients, base, userData)}
          rows={data?.data}
          disableRowSelectionOnClick
          hideFooter={true}
        />
        <Pagination
          onChange={(_, page) => {
            setQueryParams((prev) => ({
              ...prev,
              page: page - 1,
            }));
          }}
          variant="outlined"
          shape="rounded"
          page={queryParams.page + 1}
          count={Math.ceil(data?.dataLength / data?.pageSize)}
          showFirstButton={true}
          showLastButton={true}
          sx={{ margin: "20px 0", color: "rgb(148, 205, 171)" }}
        />
      </>
    );
  }
};

export default Grid;
