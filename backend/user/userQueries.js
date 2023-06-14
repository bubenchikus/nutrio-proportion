import UserModel from "./userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const decodeToken = (req, res) => {
  const token = (req.headers.authentication || "").replace(/Bearer\s?/, "");
  const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  if (!verified) {
    return res.status(404).json({
      message: "Token verification failed!",
    });
  }
  return verified;
};

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const removePasswordHashFromData = (user) => {
  const { passwordHash, ...userData } = user;
  return userData;
};

export const getMe = async (req, res) => {
  try {
    const found = await UserModel.findOne({
      _id: decodeToken(req, res)._id,
    }).lean();
    res.json(found);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Getting nutrition data from DB Failed!",
    });
  }
};

export const setMe = async (req, res) => {
  try {
    const changed = await UserModel.updateOne(
      { _id: decodeToken(req)._id },
      req.body
    ).lean();
    res.json(changed);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Getting nutrition data from DB Failed!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Incorrect email or password!",
      });
    }

    const token = signToken(user);

    res.json({
      ...removePasswordHashFromData(user),
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Authorization failed!",
    });
  }
};

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;

    if (password !== repeatPassword) {
      return res.status(400).json({
        message: "Incorrect email or password!",
      });
    }

    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = signToken(user);

    res.json({
      ...removePasswordHashFromData(user),
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed!",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.deleteOne({
      _id: decodeToken(req, res)._id,
    });
    res.json(deleted);
  } catch (err) {}
};
