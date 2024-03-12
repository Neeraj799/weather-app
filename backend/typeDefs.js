const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Weather {
    id: ID!
    location: String!
    temperature: Float!
    description: String!
    icon: String!
    feelsLike: Float!
    humidity: Int!
    windSpeed: Float!
    pressure: Int!
    date: String!
  }

  type Query {
    getCurrentWeather(location: String!): Weather
    getWeatherHistory(location: String!, startDate: String, endDate: String): [Weather]
  }

  type Mutation {
    addWeatherData(
      location: String!
      temperature: Float!
      description: String!
      icon: String!
      feelsLike: Float!
      humidity: Int!
      windSpeed: Float!
      pressure: Int!
    ): Weather
  }
`;

module.exports = typeDefs;