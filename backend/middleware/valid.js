import { body, validationResult } from "express-validator";

export const validationResultStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

export const registerValidation = [
  body("email", "Incorrect email format!").isEmail(),
  body("password", "Password should be at least 6 symbols length!").isLength({
    min: 6,
  }),
];
