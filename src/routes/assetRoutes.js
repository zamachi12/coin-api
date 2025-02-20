const express = require('express');
const { getAssets, getAssetById } = require('../controllers/assetController');
const router = express.Router();

router.get('/', getAssets);
router.get('/:id', getAssetById);

module.exports = router;
