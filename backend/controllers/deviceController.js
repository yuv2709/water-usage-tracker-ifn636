const Device = require('../models/Device');
const WaterUsage = require('../models/WaterUsage');

const createDevice = async function (req, res) {
  try {
    const { deviceId, deviceName, location, status, dailyThreshold } = req.body;

    const device = await Device.create({
      userId: req.user.id,
      deviceId,
      deviceName,
      location,
      status,
      dailyThreshold,
    });

    const sampleByLocation = {
      Bathroom: {
        dailyUsage: 621,
        monthlyUsage: 2430,
        weeklyUsage: [180, 260, 220, 410, 270, 390, 310],
      },
      Kitchen: {
        dailyUsage: 310,
        monthlyUsage: 1600,
        weeklyUsage: [140, 180, 160, 210, 175, 220, 200],
      },
      Laundry: {
        dailyUsage: 480,
        monthlyUsage: 2100,
        weeklyUsage: [200, 240, 210, 320, 260, 340, 300],
      },
      Toilet: {
        dailyUsage: 190,
        monthlyUsage: 900,
        weeklyUsage: [90, 110, 100, 130, 120, 140, 135],
      },
      Garden: {
        dailyUsage: 350,
        monthlyUsage: 1700,
        weeklyUsage: [160, 190, 170, 240, 220, 250, 230],
      },
      Other: {
        dailyUsage: 150,
        monthlyUsage: 700,
        weeklyUsage: [80, 95, 90, 110, 100, 120, 115],
      },
    };

    const sample = sampleByLocation[device.location] || sampleByLocation.Other;

    await WaterUsage.create({
      userId: req.user.id,
      deviceId: device._id,
      location: device.location,
      dailyUsage: sample.dailyUsage,
      monthlyUsage: sample.monthlyUsage,
      weeklyUsage: sample.weeklyUsage,
    });

    res.status(201).json(device);
  } catch (error) {
    console.error('CREATE DEVICE ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

const getDevices = async function (req, res) {
  try {
    const devices = await Device.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(devices);
  } catch (error) {
    console.error('GET DEVICES ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateDevice = async function (req, res) {
  try {
    const device = await Device.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json(device);
  } catch (error) {
    console.error('UPDATE DEVICE ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteDevice = async function (req, res) {
  try {
    const device = await Device.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    await WaterUsage.deleteMany({
      userId: req.user.id,
      deviceId: req.params.id,
    });

    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error('DELETE DEVICE ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
};