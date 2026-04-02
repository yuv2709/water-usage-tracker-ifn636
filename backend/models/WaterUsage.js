const mongoose = require('mongoose');

const waterUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dailyUsage: {
      type: Number,
      required: true,
      default: 0,
    },
    monthlyUsage: {
      type: Number,
      required: true,
      default: 0,
    },
    weeklyUsage: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WaterUsage', waterUsageSchema);