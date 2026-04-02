const WaterUsage = require('../models/WaterUsage');
const Device = require('../models/Device');

const getDashboardUsage = async function (req, res) {
  try {
    const filter = req.query.filter || 'Total Usage';

    const devices = await Device.find({ userId: req.user.id });

    if (!devices.length) {
      return res.status(200).json({
        today: 0,
        monthly: 0,
        threshold: 0,
        weeklyUsage: [0, 0, 0, 0, 0, 0, 0],
        selectedFilter: filter,
      });
    }

    let targetDevices = devices;

    if (filter !== 'Total Usage') {
      targetDevices = devices.filter(function (device) {
        return device.location === filter;
      });
    }

    const targetDeviceIds = targetDevices.map(function (device) {
      return device._id;
    });

    const usageRecords = await WaterUsage.find({
      userId: req.user.id,
      deviceId: { $in: targetDeviceIds },
    });

    const today = usageRecords.reduce(function (sum, record) {
      return sum + Number(record.dailyUsage || 0);
    }, 0);

    const monthly = usageRecords.reduce(function (sum, record) {
      return sum + Number(record.monthlyUsage || 0);
    }, 0);

    const threshold = targetDevices.reduce(function (sum, device) {
      return sum + Number(device.dailyThreshold || 0);
    }, 0);

    const weeklyUsage = [0, 0, 0, 0, 0, 0, 0];

    usageRecords.forEach(function (record) {
      const weekly = record.weeklyUsage || [];
      weekly.forEach(function (value, index) {
        weeklyUsage[index] += Number(value || 0);
      });
    });

    res.status(200).json({
      today,
      monthly,
      threshold,
      weeklyUsage,
      selectedFilter: filter,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const seedUsageForDevice = async function (req, res) {
  try {
    const { deviceId } = req.body;

    const device = await Device.findOne({
      _id: deviceId,
      userId: req.user.id,
    });

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const existing = await WaterUsage.findOne({
      userId: req.user.id,
      deviceId: device._id,
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    const sampleByLocation = {
      Bathroom: { dailyUsage: 621, monthlyUsage: 2430, weeklyUsage: [180, 260, 220, 410, 270, 390, 310] },
      Kitchen: { dailyUsage: 310, monthlyUsage: 1600, weeklyUsage: [140, 180, 160, 210, 175, 220, 200] },
      Laundry: { dailyUsage: 480, monthlyUsage: 2100, weeklyUsage: [200, 240, 210, 320, 260, 340, 300] },
      Toilet: { dailyUsage: 190, monthlyUsage: 900, weeklyUsage: [90, 110, 100, 130, 120, 140, 135] },
      Garden: { dailyUsage: 350, monthlyUsage: 1700, weeklyUsage: [160, 190, 170, 240, 220, 250, 230] },
      Other: { dailyUsage: 150, monthlyUsage: 700, weeklyUsage: [80, 95, 90, 110, 100, 120, 115] },
    };

    const sample = sampleByLocation[device.location] || sampleByLocation.Other;

    const usage = await WaterUsage.create({
      userId: req.user.id,
      deviceId: device._id,
      location: device.location,
      dailyUsage: sample.dailyUsage,
      monthlyUsage: sample.monthlyUsage,
      weeklyUsage: sample.weeklyUsage,
    });

    res.status(201).json(usage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardUsage,
  seedUsageForDevice,
};