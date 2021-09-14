const configProduction = {
  API_PROTOCOL: 'http',
  API_HOST: 'localhost',
  API_PORT: '3000',  
};

const configDevelopment = {
  API_PROTOCOL: 'http',
  API_HOST: 'localhost',
  API_PORT: '3000',  
};

const config = 
  process.env.NODE_ENV === 'production' 
  ? configProduction 
  : configDevelopment ?? configProduction;

module.exports = config;
