import NutritionModel from "./nutritionSchema.js";

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

    const pageSize = 10;
    const page = req.query.page ?? 0;

    const dataLength = (await NutritionModel.aggregate(pipeline)).length;

    pipeline.push({ $skip: pageSize * page }, { $limit: pageSize });

    const found = await NutritionModel.aggregate(pipeline);
    res.json({ data: found, dataLength: dataLength, pageSize: pageSize });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Getting nutrition data from DB Failed!",
    });
  }
};

export const getNutritionById = async (req, res) => {
  try {
    const found = await NutritionModel.findById(req.params.id);
    res.json(found);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Getting nutrition data from DB Failed!",
    });
  }
};
