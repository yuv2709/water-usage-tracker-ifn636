const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
      trim: true,
    },
    deviceName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      enum: ["Bathroom", "Kitchen", "Laundry", "Toilet", "Garden", "Other"],
    },
    status: {
      type: String,
      enum: ["Connected", "Disconnected"],
      default: "Connected",
    },
    dailyThreshold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);