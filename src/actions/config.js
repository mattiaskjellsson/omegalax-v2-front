const production = {
  API_PROTOCOL: 'http',
  API_HOST: '139.162.180.253',
  API_PORT: 3000,
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
