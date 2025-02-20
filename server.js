require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const assetRoutes = require('./src/routes/assetRoutes');
const walletRoutes = require('./src/routes/walletRoutes');

connectDB();
const app = express();
app.use(express.json());

app.use('/api/assets', assetRoutes);
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));