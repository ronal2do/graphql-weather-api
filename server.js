'use strict';
import 'babel-polyfill';

import express from 'express';
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import weatherType from './WeatherType';
import { fetchWeather } from './helper'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'The root of all... queries',    
    fields: {
      getWeather: {
        type: weatherType,
        args: {
          city: {
            type: new GraphQLNonNull(GraphQLString),
          },
          countryCode: {
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        resolve: async (_, {city, countryCode}) => {
          return await fetchWeather({city, countryCode});
        }
      },

    }
  }),
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));