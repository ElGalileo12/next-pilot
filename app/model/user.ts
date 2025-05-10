import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLegth: [3, "Username must be at least 3 characters"],
    maxLegth: [20, "Username must be at most 20 characters"],
  },
  email: { type: String, unique: true, required: [true, "Email is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", userSchema)
export default User;