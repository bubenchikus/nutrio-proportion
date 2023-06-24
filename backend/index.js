import express from "express";
import mongoose from "mongoose";
import * as NutritionQueries from "./src/nutrition/nutritionQueries.js";
import * as UserQueries from "./src/user/userQueries.js";
import * as TokenQueries from "./src/user/tokenQueries.js";
import { checkAuth } from "./src/middleware/auth.js";
import {
  registerValidation,
  meValidation,
  queryValidation,
  validationResultStatus,
} from "./src/middleware/valid.js";
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

app.get(
  "/nutrition",
  queryValidation,
  validationResultStatus,
  NutritionQueries.getNutrition
); // filter with query parameters: asc/desc, priority nutrient by calories/weight proportion, word search
app.get("/nutrition/:id", NutritionQueries.getNutritionById);

app.post("/login", UserQueries.login);

app.post(
  "/register",
  registerValidation,
  validationResultStatus,
  UserQueries.register
);

app.get("/me", checkAuth, UserQueries.getMe);
app.post(
  "/me",
  checkAuth,
  meValidation,
  validationResultStatus,
  UserQueries.setMe
);
app.delete("/me", checkAuth, UserQueries.deleteUser);

app.get("/me/favourites", checkAuth);

app.get("/verify", TokenQueries.sendVerificationToken);
app.get("/verify/:token", TokenQueries.recieveVerificationToken);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK. Running on port ${process.env.PORT}...`);
});
