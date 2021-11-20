const production = {
  API_PROTOCOL: 'http',
  API_HOST: '31.216.138.108',
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
