const Wallet = require('../models/walletModel');
const axios = require('axios');

const addAssetToWallet = async (req, res) => {
    const { userId, assetId, amount } = req.body;
    
    try {
        const { data } = await axios.get(`https://api.coincap.io/v2/assets/${assetId}`);
        const assetValue = parseFloat(data.data.priceUsd) * amount;

        let wallet = await Wallet.findOne({ userId });
        if (!wallet) wallet = new Wallet({ userId, assets: [] });

        const assetIndex = wallet.assets.findIndex(a => a.assetId === assetId);
        if (assetIndex >= 0) {
            wallet.assets[assetIndex].amount += amount;
            wallet.assets[assetIndex].valueUSD += assetValue;
        } else {
            wallet.assets.push({ assetId, symbol: data.data.symbol, amount, valueUSD: assetValue });
        }

        wallet.totalValue = wallet.assets.reduce((acc, asset) => acc + asset.valueUSD, 0);
        await wallet.save();

        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Error adding asset' });
    }
};

const getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.params.userId });
        if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wallet' });
    }
};

module.exports = { addAssetToWallet, getWallet };
