import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLID, GraphQLFloat } from 'graphql';
import {
  avg,
  toFarenheit,
  toCelsius,
  toKelvin,
} from './helper'

const weatherType = new GraphQLObjectType({
  name: "Weather",
  fields: () => ({
    cod: { type: GraphQLString },
    message: { type: GraphQLFloat },
    cnt: { type: GraphQLInt },
    city: { type: CityType },
    list: {type: new GraphQLList(ListType)},
    fahrenheit_avg: {
      type: GraphQLFloat,
      resolve: obj => toFarenheit(avg(obj.list.map(weather => weather.main.temp), obj.list.length))
    },
    celcius_avg: {
      type: GraphQLFloat,
      resolve: obj => toCelsius(avg(obj.list.map(weather => weather.main.temp), obj.list.length))
    },
    kelvin_avg: {
      type: GraphQLFloat,
      resolve: obj => toKelvin(avg(obj.list.map(weather => weather.main.temp), obj.list.length))
    },
    pressure_avg: {
      type: GraphQLFloat,
      resolve: obj => avg(obj.list.map(weather => weather.main.pressure), obj.list.length).toFixed(2)
    },
    humidity_avg: {
      type: GraphQLFloat,
      resolve: obj => avg(obj, weather, weather.main.humidity).toFixed(2)
    },
    pressure: {
      type: new GraphQLList(GraphQLFloat),
      resolve: obj => obj.list.map(weather => weather.main.pressure)
    },
    humidity: {
      type: new GraphQLList(GraphQLFloat),
      resolve: obj => obj.list.map(weather => weather.main.humidity)
    },
    temp_farenheit: {
      type: new GraphQLList(GraphQLFloat),
      resolve: obj => obj.list.map(weather => toFarenheit(weather.main.temp))
    },
    temp_celcius: {
      type: new GraphQLList(GraphQLFloat),
      resolve: obj => obj.list.map(weather => toCelsius(weather.main.temp))
    },
    temp_kelvin: {
      type: new GraphQLList(GraphQLFloat),
      resolve: obj => obj.list.map(weather => toKelvin(weather.main.temp))
    },
  })
});

const CityType = new GraphQLObjectType({
  name: "City",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    population: { type: GraphQLInt },
    coord: {type: CoordinatesType },
  })
});

const CoordinatesType = new GraphQLObjectType({
  name: "Coordinates",
  fields: () => ({
    lon: { type: GraphQLFloat },
    lat: { type: GraphQLFloat},
  }),
});

const ListType = new GraphQLObjectType({
  name: "List",
  fields: () => ({
    dt: { type: GraphQLInt },
    dt_txt: { type: GraphQLString },
    main: { type: MainType },
    weather: { type: new GraphQLList(WeatherListType) },
    wind: { type: windType },
    clouds: { type: cloudsType }
  }),
});

const MainType = new GraphQLObjectType({
  name: "Main",
  fields: () => ({
    pressure: { type: GraphQLFloat },
    sea_level: { type: GraphQLFloat },
    grnd_level: { type: GraphQLFloat },
    humidity: { type: GraphQLInt },
    temp: { type: GraphQLFloat },
    temp_min: { type: GraphQLFloat },
    temp_max: { type: GraphQLFloat },
    temp_kf: { type: GraphQLFloat},
    temp_f: {
      type: GraphQLFloat,
      resolve: obj => toFarenheit(obj.temp)
    },
    celcius: {
      type: GraphQLFloat,
      resolve: obj => toCelsius(obj.temp)
    },
  }),
});

const WeatherListType = new GraphQLObjectType({
  name: "WeatherList",
  fields: () => ({
    id: { type: GraphQLID },
    main: { type: GraphQLString},
    description: { type: GraphQLString},
    icon: { type: GraphQLString},
  }),
});

const windType = new GraphQLObjectType({
  name: "Wind",
  fields: () => ({
    speed: { type: GraphQLFloat },
    deg: { type: GraphQLFloat },
  }),
});

const cloudsType = new GraphQLObjectType({
  name: "Clouds",
  fields: () => ({
    all: { type: GraphQLInt },
  }),
});

export default weatherType;