import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } }, // 86400000 - day
});

export default mongoose.model("Token", TokenSchema, "token");
