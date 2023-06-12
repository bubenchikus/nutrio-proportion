import UserModel from "./userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getMe = async (req, res) => {
  try {
    const token = (req.headers.authentication || "").replace(/Bearer\s?/, "");
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const found = await UserModel.findOne({ _id: decoded._id });
    res.json(found);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Getting nutrition data from DB Failed!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Incorrect email or password!",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user;

    res.json({
      ...userData,
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
    const password = req.body.password;
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed!",
    });
  }
};

// export const editUser = async (req, res) => {
//     try {
//       const found = await UserModel.findOne({ _id: req.params.id });
//       res.json(found);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Getting nutrition data from DB Failed!",
//       });
//     }
//   };
