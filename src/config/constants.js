const devConfig = {
  MONGO_URL: 'mongodb://localhost/fba-service-dev',
  JWT_SECRET: 'thisisasecret',
  AWS_ACCESS_ID: 'AKIAJKULDKEKH27NB33Q',
  AWS_SECRET_KEY: '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',
  CORS_REMOTE: 'http://localhost:3000',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/fba-service-test',
  JWT_SECRET: 'thisisasecret',
  CORS_REMOTE: 'http://localhost:3000',
};

const prodConfig = {
  MONGO_URL: 'mongodb://webkhoa:3fd825e704a54887b856fafc7d881726@127.0.0.1/webkhoa',
  JWT_SECRET: 'thisisasecretsecret',
  AWS_ACCESS_ID: 'AKIAJKULDKEKH27NB33Q',
  AWS_SECRET_KEY: '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',
  CORS_REMOTE: 'https://webkhoa-service.innoteq.vn',
};

const defaultConfig = {
  PORT: process.env.PORT || 7777,
};

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
