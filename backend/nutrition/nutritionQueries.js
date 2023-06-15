import NutritionModel from "./nutritionSchema.js";
import * as helpers from "./helpers.js";

export const getNutrition = async (req, res) => {
  try {
    const pipeline = [];

    if (req.query.description) {
      pipeline.push({
        $match: {
          description: { $regex: req.query.description, $options: "i" },
        },
      });
    } else {
      pipeline.push({ $match: {} });
    }

    // base - byWeight or byCalories; key - carb, protein, fat, fiber; sort - asc or desc
    const base = req.query.base || "byCalories";
    const key = req.query.key || "protein";
    const sort = req.query.sort === "asc" ? 1 : -1;

    pipeline.push({
      $match: {
        [`foodNutrients.proportions.${base}.${key}`]: { $exists: true },
      },
    });

    pipeline.push({
      $sort: {
        [`foodNutrients.proportions.${base}.${key}`]: sort,
      },
    });

    const found = await NutritionModel.aggregate(pipeline);
    res.json(found);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Getting nutrition data from DB Failed!",
    });
  }
};

export const getNutritionById = async (req, res) => {
  try {
    const found = await NutritionModel.findOne({ _id: req.params.id });
    res.json(found);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Getting nutrition data from DB Failed!",
    });
  }
};

// export const postNutrition = async (req, res) => {
//   try {
//     // const found = await NutritionModel.findOne({ _id: req.params.id });
//     const proportions = helpers.calculateProportions(
//       req.body.cals,
//       req.body.carb,
//       req.body.protein,
//       req.body.fat,
//       req.body.fiber
//     );
//     const posted = await NutritionModel.create({
//       description: req.body.description,
//       dataType: "User",
//       foodNutrients: {
//         byWeight: proportions[0],
//         byCalories: proportions[1],
//       },
//     });
//     res.json(posted);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Getting nutrition data from DB Failed!",
//     });
//   }
// };
