import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import styles from "../styles/Grid.module.scss";
import HSBar from "react-horizontal-stacked-bar-chart";

const Grid = ({ data, nKey = "protein", base = "byWeight" }) => {
  const colorScheme = {
    carb: "#d9850f",
    fiber: "#e0bf46",
    protein: "#3c31de",
    fat: "#24bf2c",
  };
  var nutrients = ["carb", "protein", "fat"];
  nutrients.splice(nutrients.indexOf(nKey), 1);
  nutrients = [nKey].concat(nutrients);
  return (
    <DataGrid
      initialState={{
        sort: {},
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
      disableColumnResize={false}
      sx={{ width: "100%", cursor: "pointer", zIndex: "0" }}
      getRowId={(row) => row._id}
      columns={[{ field: "description", flex: 1.5 }]
        .concat(
          nutrients.map((nutrient) => {
            return {
              field: nutrient,
              valueGetter: (params) =>
                params.row?.foodNutrients?.proportions[base][nutrient]
                  ? params.row?.foodNutrients?.proportions[base][nutrient]
                  : 0,
              flex: 0.5,
            };
          })
        )
        .concat([
          {
            field: "preview",
            flex: 1.5,
            renderCell: (params) => {
              return Object.keys(params.row.foodNutrients.proportions[base])
                .length > 0 ? (
                <HSBar
                  showTextIn
                  // showTextUp
                  //   height={20}
                  //   fontColor="white"
                  //   sx={{ margin: "5px" }}
                  data={Object.keys(params.row.foodNutrients.proportions[base])
                    .filter(
                      (nutrient) =>
                        params.row.foodNutrients.proportions[base][nutrient] >
                          0 && nutrient != "fiber"
                    )
                    .map((nutrient) => {
                      {
                        return {
                          value:
                            params.row.foodNutrients.proportions[base][
                              nutrient
                            ],
                          description:
                            params.row.foodNutrients.proportions[base][
                              nutrient
                            ] > 15
                              ? nutrient
                              : " ",
                          color: colorScheme[nutrient],
                        };
                      }
                    })}
                />
              ) : (
                <div>No data available!</div>
              );
            },
          },
        ])}
      rows={data}
      disableRowSelectionOnClick
    />
  );
};

export default Grid;
