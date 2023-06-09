import mongoose from "mongoose";

const NutritionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  dataType: {
    type: String,
    required: true,
  },
  foodNutrients: {
    "Carbohydrate, by difference": { type: Number, required: false },
    Protein: { type: Number, required: false },
    "Total lipid (fat)": { type: Number, required: false },
    "Fiber, total dietary": { type: Number, required: false },
    Energy: { type: Number, required: false },
    "Energy (Atwater Specific Factors)": { type: Number, required: false },
    "Energy (Atwater General Factors)": { type: Number, required: false },
    proportions: {
      byWeight: {
        protein: { type: Number, required: false },
        fat: { type: Number, required: false },
        fiber: { type: Number, required: false },
        carb: { type: Number, required: false },
      },
      byCalories: {
        protein: { type: Number, required: false },
        fat: { type: Number, required: false },
        fiber: { type: Number, required: false },
        carb: { type: Number, required: false },
      },
    },
  },
  avatarUrl: String,
});

export default mongoose.model("Nutrition", NutritionSchema, "nutrition");
