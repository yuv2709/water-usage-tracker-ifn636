const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
} = require("../controllers/deviceController");

router.use(protect);

router.route("/")
  .post(createDevice)
  .get(getDevices);

router.route("/:id")
  .put(updateDevice)
  .delete(deleteDevice);

module.exports = router;