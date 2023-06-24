import UserModel from "./userSchema.js";
import bcrypt from "bcrypt";
import * as tokenQueries from "./tokenQueries.js";

const removePasswordHashFromData = (user) => {
  const { passwordHash, ...userData } = user;
  return userData;
};

export const getMe = async (req, res) => {
  try {
    const found = await UserModel.findById(
      tokenQueries.decodeToken(req, res)._id
    ).lean();
    res.json(found);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Fetching user data failed!",
    });
  }
};

export const setMe = async (req, res) => {
  try {
    const changed = await UserModel.updateOne(
      { _id: tokenQueries.decodeToken(req)._id },
      req.body
    ).lean();
    res.json(changed);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Patching user data failed!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).lean();

    if (!user) {
      // we should not let people know if email is registered or not
      return res.status(401).json({ msg: "Incorrect email or password!" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPass) {
      return res.status(401).json({
        msg: "Incorrect email or password!",
      });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ msg: "Please verify your email to activate account!" });
    }

    const token = tokenQueries.signToken(user);

    res.json({
      ...removePasswordHashFromData(user),
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Authorization failed!",
    });
  }
};

export const register = async (req, res) => {
  try {
    const found = await UserModel.findOne({ email: req.body.email });
    if (found) {
      return res.status(400).json({
        msg: "User with this email already exists!",
      });
    }

    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = await new UserModel({
      email: req.body.email,
      passwordHash: hash,
    }).save();

    const token = tokenQueries.signToken(user);

    res.json({
      ...removePasswordHashFromData(user),
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Registration failed!",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.deleteOne({
      _id: tokenQueries.decodeToken(req, res)._id,
    });
    res.json(deleted);
  } catch (err) {}
};
