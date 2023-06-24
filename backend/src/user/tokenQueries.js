import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserModel from "./userSchema.js";
import TokenModel from "./tokenSchema.js";

export const decodeToken = (req, res) => {
  const token = (req.headers.authentication || "").replace(/Bearer\s?/, "");
  const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  if (!verified) {
    res.status(500).json({
      msg: "Token verification failed!",
    });
  }
  return verified;
};

export const signToken = (user, expires = "30d") => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: expires,
    }
  );
};

async function sendVerificationEmail(userEmail, token) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.beget.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.MAIL_USER,
      to: userEmail,
      subject: "Nutrio-proportion - account verification",

      text: `Your verification link: ${process.env.VERIFICATION_PAGE}/${token}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Something went wrong while configuring or sending verification email! You can try to resend token at any time.",
    });
  }
}

export const sendVerificationToken = async (req, res) => {
  try {
    const oldToken = await TokenModel.findById(decodeToken(req, res)._id);

    if (oldToken) {
      await TokenModel.findByIdAndDelete(decodeToken(req, res)._id);
    }

    const user = await UserModel.findById(decodeToken(req, res)._id).lean();

    const token = signToken(user._id, "1d");

    await new TokenModel({
      _id: user._id,
      token: token,
    }).save();

    sendVerificationEmail(user.email, token);

    res.json("Verification token successfully sent!");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Something went wrong while creating or sending verification token! You can try to resend token at any time.",
    });
  }
};

export const recieveVerificationToken = async (req, res) => {
  try {
    const foundToken = await TokenModel.findOne({ token: req.params.token });

    if (!foundToken) {
      return res.status(500).json({
        msg: "Your token was not found in DB! It may be expired.",
      });
    }

    const userId = jwt.verify(
      req.params.token,
      process.env.JWT_TOKEN_SECRET
    )._id;

    const foundUser = UserModel.findById(userId).lean();

    if (!foundUser) {
      res.status(401).json({
        msg: "User is not found. Please sign up.",
      });
    } else if (foundUser.isVerified) {
      res.json("User is already verified!");
    }

    await UserModel.updateOne({ _id: userId }, { isVerified: true });

    await TokenModel.findByIdAndDelete(userId);

    res.json("Your account has been successfully verified");
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong in verification process! Please try again.",
    });
  }
};
