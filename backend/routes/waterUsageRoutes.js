const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  getDashboardUsage,
  seedUsageForDevice,
} = require('../controllers/waterUsageController');

router.use(protect);

router.get('/dashboard', getDashboardUsage);
router.post('/seed', seedUsageForDevice);

module.exports = router;