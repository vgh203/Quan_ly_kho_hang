const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken } = require('../middlewares/auth');

router.use(authenticateToken);

router.get('/', inventoryController.getImports);

module.exports = router;
