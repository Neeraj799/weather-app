const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/weather-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Start the Apollo Server
const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app, cors: false });

    app.use(cors());

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`GraphQL playground available at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();