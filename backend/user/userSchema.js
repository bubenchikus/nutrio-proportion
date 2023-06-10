import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  hashPassword: {
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
      base: { byCalories: { type: String, required: true } },
      key: { protein: { type: String, required: true } },
      sort: { asc: { type: String, required: true } },
    },
  },
});

export default mongoose.model("User", UserSchema, "user");
