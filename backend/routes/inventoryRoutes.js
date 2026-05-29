const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken } = require('../middlewares/auth');

router.use(authenticateToken);

router.get('/', inventoryController.getInventory);
router.get('/dashboard', inventoryController.getDashboard);
router.get('/alerts', inventoryController.getAlerts);
router.get('/stats', inventoryController.getStats);
router.get('/lots/:productId', inventoryController.getProductLots);
router.get('/returnable-products', inventoryController.getReturnableProducts);
router.get('/bell-notifications', inventoryController.getBellNotifications);
router.get('/replenishments/suggestions', inventoryController.getReplenishmentSuggestions);

module.exports = router;
