const production = {
  API_PROTOCOL: 'http',
  API_HOST: process.env.NODE_ENV.API_HOST ?? 'back',
  API_PORT: process.env.NODE_ENV.API_PORT ?? 3000,
};

const development = {
  API_PROTOCOL: 'http',
  API_HOST: 'localhost',
  API_PORT: 3000,
};

const config = process.env.NODE_ENV === 'production' 
  ? production 
  : development 
  ?? production;

module.exports = config;
