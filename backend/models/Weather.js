const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    location: String,
    temperature: Number,
    description: String,
    icon: String,
    feelsLike: Number,
    humidity: Number,
    windSpeed: Number,
    pressure: Number,
    date: Date,
});

module.exports = mongoose.model('Weather', weatherSchema);