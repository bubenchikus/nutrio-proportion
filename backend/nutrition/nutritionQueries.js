import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import NutritionModel from "./nutritionSchema.js";

export const getNutrition = async (req, res) => {
  try {
    let dbQuery;

    if (req.query.description) {
      // from search field
      dbQuery = NutritionModel.find({
        description: { $regex: req.query.description, $options: "i" },
      });
    } else {
      dbQuery = NutritionModel.find();
    }

    if (req.query.base) {
      // weight or cals
    }

    if (req.query.key) {
      // carb, protein, fat, fiber, cals
    }

    if (req.query.sort) {
      // asc or desc
      console.log("!!!!");
    }

    const found = await dbQuery;
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
