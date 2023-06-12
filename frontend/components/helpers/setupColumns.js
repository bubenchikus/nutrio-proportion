import HSBar from "react-horizontal-stacked-bar-chart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const setupColumns = (nutrients, base, favourites) => {
  const favouriteColumn = {
    field: "fav",
    flex: 0.1,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return <FavoriteIcon />;
    },
  };

  const descriptionColumn = {
    field: "description",
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
  };

  const caloriesColumn = {
    field: "calories",
    align: "center",
    headerAlign: "center",
    flex: 0.5,
    sortable: false,
    disableColumnMenu: true,
    valueGetter: (params) => {
      var title = "Energy";
      Object.keys(params.row?.foodNutrients).forEach((el) => {
        console.log(el);
        if (el.includes("Energy")) {
          title = el;
        }
      });
      return params.row?.foodNutrients[title]
        ? params.row?.foodNutrients[title]
        : 0;
    },
  };

  const nutrientColumns = nutrients.map((nutrient) => {
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
      disableColumnMenu: true,
    };
  });

  const colorScheme = {
    carb: "#d9850f",
    fiber: "#c96424",
    protein: "#3c31de",
    fat: "#24bf2c",
  };

  const proportionPreview = [
    {
      field: "proportion preview",
      flex: 1.5,
      sortable: false,
      headerAlign: "center",
      disableColumnMenu: true,
      renderCell: (params) => {
        return Object.keys(params.row.foodNutrients.proportions[base]).length >
          0 ? (
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
                      params.row.foodNutrients.proportions[base][nutrient] -
                      params.row.foodNutrients.proportions[base]["fiber"],
                    description:
                      params.row.foodNutrients.proportions[base][nutrient] -
                        params.row.foodNutrients.proportions[base]["fiber"] >
                      15
                        ? nutrient
                        : " ",
                    color: colorScheme[nutrient],
                  };
                } else {
                  return {
                    value: params.row.foodNutrients.proportions[base][nutrient],
                    description:
                      params.row.foodNutrients.proportions[base][nutrient] > 15
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
  ];

  return [favouriteColumn, descriptionColumn, caloriesColumn]
    .concat(nutrientColumns)
    .concat(proportionPreview);
};

export default setupColumns;
