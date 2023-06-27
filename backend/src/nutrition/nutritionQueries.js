import NutritionModel from "./nutritionSchema.js";
import UserModel from "../user/userSchema.js";
import { decodeToken } from "../user/tokenQueries.js";
import mongoose from "mongoose";

function setDefaults(req) {
  const base = req.query.base || "byCalories";
  const key = req.query.key || "protein";
  const sort = req.query.sort === "asc" ? 1 : -1;
  return { base: base, key: key, sort: sort };
}

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
    const defaults = setDefaults(req);

    pipeline.push({
      $match: {
        [`foodNutrients.proportions.${defaults.base}.${defaults.key}`]: {
          $exists: true,
        },
      },
    });

    pipeline.push({
      $sort: {
        [`foodNutrients.proportions.${defaults.base}.${defaults.key}`]:
          defaults.sort,
      },
    });

    const pageSize = parseInt(process.env.PAGE_SIZE);
    const page = parseInt(req.query.page) || 0;
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

export const getFavourites = async (req, res) => {
  try {
    const user = await UserModel.findById(decodeToken(req, res)._id).lean();

    const favouriteIds = user.favourites;
    const defaults = setDefaults(req);

    const data = await Promise.all(
      favouriteIds.map(
        async (id) =>
          await NutritionModel.findById(new mongoose.Types.ObjectId(id)).then(
            (res) => res.toJSON()
          )
      )
    );

    data.sort((a, b) => {
      const nutrient_a =
        a.foodNutrients?.proportions[defaults.base][defaults.key];
      const nutrient_b =
        b.foodNutrients?.proportions[defaults.base][defaults.key];
      if (defaults.sort === "asc") {
        return nutrient_a - nutrient_b;
      } else {
        return nutrient_b - nutrient_a;
      }
    });

    const pageSize = parseInt(process.env.PAGE_SIZE);
    const page = parseInt(req.query.page) || 0;
    const dataLength = data.length;

    const startIndex = pageSize * page;
    const stopIndex = pageSize * (page + 1);

    const paginatedData = data.slice(
      startIndex,
      stopIndex < dataLength ? stopIndex : dataLength
    );

    res.json({
      data: paginatedData,
      dataLength: dataLength,
      pageSize: pageSize,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Getting favourites from DB Failed!",
    });
  }
};
