const axios = require('axios');

const getAssets = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.coincap.io/v2/assets', {
            params: req.query,
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assets' });
    }
};

const getAssetById = async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.coincap.io/v2/assets/${req.params.id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asset details' });
    }
};

module.exports = { getAssets, getAssetById };