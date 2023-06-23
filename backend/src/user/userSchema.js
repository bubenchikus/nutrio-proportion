import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  favourites: {
    type: Array,
    required: true,
    default: [],
  },

  preferences: {
    type: Object,
    required: true,
    default: {
      base: "byCalories",
      key: "protein",
      sort: "desc",
    },
  },

  isVerified: { type: Boolean, required: true, default: false },
});

export default mongoose.model("User", UserSchema, "user");
