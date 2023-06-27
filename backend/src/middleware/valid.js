import { body, query, validationResult } from "express-validator";

export const validationResultStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

export const registerValidation = [
  body("email").isEmail().withMessage("Incorrect email format!"),
  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 symbols length!")
    .custom((value, { req }) => value !== req.body.repeatPassword)
    .withMessage("Passwords do not match!"),
];

export const meValidation = [
  body("preferences.base")
    .isIn(["byWeight", "byCalories"])
    .withMessage("Invalid base value!"),
  body("preferences.key")
    .isIn(["carb", "fiber", "protein", "fat"])
    .withMessage("Invalid key value!"),
  body("preferences.sort")
    .isIn(["asc", "desc"])
    .withMessage("Invalid sort value!"),
];

export const queryValidation = [
  query("description")
    .isLength({ max: 255 })
    .withMessage("Description must be less than 255 characters long!")
    .optional(),
  query("base")
    .isIn(["byWeight", "byCalories"])
    .withMessage("Base query parameter is not in the list of valid values!"),
  query("key")
    .isIn(["carb", "fiber", "protein", "fat"])
    .withMessage("Key query parameter is not in the list of valid values!!"),
  query("sort")
    .isIn(["asc", "desc"])
    .withMessage("Sort query parameter is not in the list of valid values!"),
  query("page")
    .customSanitizer((value) => parseInt(value))
    .isInt()
    .withMessage("Page query parameter must be integer!")
    .optional(),
];

export const favouritesValidation = [
  query("ids.*", "Incorrect id format detected!")
    .isString()
    .isLength({ min: 24, max: 24 }),
];
