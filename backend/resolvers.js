const Weather = require('./models/Weather');

const resolvers = {
    Query: {
        getCurrentWeather: async (_, { location }) => {
            // Fetch current weather data from the Open Weather Map API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`);
            const data = await response.json();

            // Save the fetched weather data to the database
            const weatherData = new Weather({
                location: data.name,
                temperature: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                pressure: data.main.pressure,
                date: new Date().toISOString(),
            });
            await weatherData.save();

            return weatherData;
        },
        getWeatherHistory: async (_, { location, startDate, endDate }) => {
            const filter = { location };
            if (startDate) filter.date = { $gte: new Date(startDate) };
            if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };
            const weatherHistory = await Weather.find(filter);
            return weatherHistory;
        },
    },
    Mutation: {
        addWeatherData: async (_, { location, temperature, description, icon, feelsLike, humidity, windSpeed, pressure }) => {
            const weatherData = new Weather({
                location,
                temperature,
                description,
                icon,
                feelsLike,
                humidity,
                windSpeed,
                pressure,
                date: new Date().toISOString(),
            });
            await weatherData.save();
            return weatherData;
        },
    },
};

module.exports = resolvers;