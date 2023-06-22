import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, expire: 60 * 60 * 24, default: Date.now },
});

export default mongoose.model("Token", TokenSchema, "token");
