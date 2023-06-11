import { DataGrid } from "@mui/x-data-grid";
import styles from "../styles/Grid.module.scss";
import HSBar from "react-horizontal-stacked-bar-chart";

const Grid = ({ data, queryParams, nutrientList }) => {
  const base = queryParams[1];
  const nKey = queryParams[2];

  const colorScheme = {
    carb: "#d9850f",
    fiber: "#c96424",
    protein: "#3c31de",
    fat: "#24bf2c",
  };

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
      //   initialState={{
      //     pagination: {
      //       paginationModel: {
      //         pageSize: 15,
      //       },
      //     },
      //   }}
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
      columns={[{ field: "description", flex: 1.5, sortable: false }]
        .concat(
          nutrients.map((nutrient) => {
            return {
              field: nutrient === "carb" ? "carb, incl. fiber" : nutrient,
              valueGetter: (params) =>
                params.row?.foodNutrients?.proportions[base][nutrient]
                  ? params.row?.foodNutrients?.proportions[base][nutrient]
                  : 0,
              flex: 0.5,
              sortable: false,
              align: "center",
              headerAlign: "center",
            };
          })
        )
        .concat([
          {
            field: "proportion preview",
            flex: 1.5,
            sortable: false,
            headerAlign: "center",
            renderCell: (params) => {
              return Object.keys(params.row.foodNutrients.proportions[base])
                .length > 0 ? (
                <HSBar
                  showTextIn
                  data={nutrients
                    .filter(
                      (nutrient) =>
                        params.row.foodNutrients.proportions[base][nutrient] > 0
                    )
                    .map((nutrient) => {
                      if (nutrient === "carb") {
                        return {
                          value:
                            params.row.foodNutrients.proportions[base][
                              nutrient
                            ] -
                            params.row.foodNutrients.proportions[base]["fiber"],
                          description:
                            params.row.foodNutrients.proportions[base][
                              nutrient
                            ] -
                              params.row.foodNutrients.proportions[base][
                                "fiber"
                              ] >
                            15
                              ? nutrient
                              : " ",
                          color: colorScheme[nutrient],
                        };
                      } else {
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
