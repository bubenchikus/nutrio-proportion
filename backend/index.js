import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { NutritionQueries } from "./nutrition/index.js";
dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_BASE_NUTRITION)
  .then(() => console.log("Succesfully connected to DB..."))
  .catch((err) => console.log("Connection failed!", err));

app.get("/food", NutritionQueries.getNutrition); // filter with query parameters: asc/desc, priority nutrient by calories/weight proportion, word search
app.get("/food/:id", NutritionQueries.getNutritionById);

app.get("/login");
app.get("/register");
app.get("/me/favourites");
app.get("/me/edit-profile");
app.get("/me/edit-favourites");

app.use("/pictures", express.static("pictures"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK. Running on port ${process.env.PORT}...`);
});
