const Device = require("../models/Device");

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

    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDevices = async function (req, res) {
  try {
    const devices = await Device.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(devices);
  } catch (error) {
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
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json(device);
  } catch (error) {
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
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
};