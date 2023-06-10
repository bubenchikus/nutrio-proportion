import UserModel from "./userSchema.js";
import bcrypt from "bcrypt";

export const getUserById = async (req, res) => {
  try {
    const found = await UserModel.findOne({ _id: req.params.id });
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
      process.env.JWT_PASSWORD_SECRET,
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
      message: "Authorization failed!",
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
