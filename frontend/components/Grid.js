import { DataGrid } from "@mui/x-data-grid";
import styles from "../styles/Grid.module.scss";
import setupColumns from "./helpers/setupColumns";

const Grid = ({ data, queryParams, nutrientList }) => {
  const base = queryParams[1];
  const nKey = queryParams[2];

  var nutrients = nutrientList;
  if (nKey === "carb") {
    nutrients.splice(nutrients.indexOf(nKey), 2);
    nutrients = [nKey, "fiber"].concat(nutrients);
  } else {
    nutrients.splice(nutrients.indexOf(nKey), 1);
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
      columns={setupColumns(nutrients, base)}
      rows={data}
      disableRowSelectionOnClick
    />
  );
};

export default Grid;
