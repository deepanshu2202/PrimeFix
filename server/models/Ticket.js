import mongoose, { Mongoose } from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },
      id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
      },
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: [String],
    address: {
      main: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "India",
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      altPhone: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["pending", "inProgress", "completed", "cancelled"],
      required: true,
    },
    charge: {
      type: String,
    },
    worker: {
      name: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    },
  },
  { timestamps: true }
);

export default mongoose.model("ticket", ticketSchema);
