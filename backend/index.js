import express from "express";
import mongoose from "mongoose";
import * as NutritionQueries from "./nutrition/nutritionQueries.js";
import * as UserQueries from "./user/userQueries.js";
import { checkAuth } from "./auth.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGODB_BASE_NUTRITION)
  .then(() => console.log("Succesfully connected to DB..."))
  .catch((err) => console.log("Connection failed!", err));

app.get("/nutrition", NutritionQueries.getNutrition); // filter with query parameters: asc/desc, priority nutrient by calories/weight proportion, word search
app.post("/nutrition", checkAuth, NutritionQueries.postNutrition);
app.get("/nutrition/:id", NutritionQueries.getNutritionById);

app.post("/login", UserQueries.login);

app.post("/register", UserQueries.register);

app.get("/me", checkAuth, UserQueries.getMe);
app.post("/me", checkAuth);

app.get("/me/favourites", checkAuth);
app.post("/me/favourites", checkAuth);

// app.use("/pictures", express.static("pictures"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK. Running on port ${process.env.PORT}...`);
});
