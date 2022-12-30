import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name:String,
  photo:String,
  googleId:{
    type: String,
    required: true,
    uique: true,
  },
  role: {
    type: "String",
    enum: ["admin", "user"],
    default: "user",
  },
  ceatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", schema)