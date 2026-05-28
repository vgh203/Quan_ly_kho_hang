const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken } = require('../middlewares/auth');

router.use(authenticateToken);

router.get('/dashboard', inventoryController.getDashboard);
router.get('/alerts', inventoryController.getAlerts);
router.get('/stats', inventoryController.getStats);

module.exports = router;
