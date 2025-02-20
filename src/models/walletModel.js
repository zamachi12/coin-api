const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    assets: [
        {
            assetId: String,
            symbol: String,
            amount: Number,
            valueUSD: Number,
        }
    ],
    totalValue: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Wallet', WalletSchema);
