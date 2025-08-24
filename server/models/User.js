import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      main: String,
      city: String,
      pincode: String,
      state: String,
      country: {
        type: String,
        default: "India",
      },
      phone: String,
      altPhone: String,
    },
    role: {
      type: String,
      enum: ["user", "worker", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
