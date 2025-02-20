const express = require('express');
const { addAssetToWallet, getWallet } = require('../controllers/walletController');
const router = express.Router();

router.post('/add', addAssetToWallet);
router.get('/:userId', getWallet);

module.exports = router;
