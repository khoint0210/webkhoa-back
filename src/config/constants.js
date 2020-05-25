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
  MONGO_URL: 'mongodb://webthinh:thinhtruong@127.0.0.1/webthinh',
  JWT_SECRET: 'thisisasecretsecret',
  AWS_ACCESS_ID: 'AKIAJKULDKEKH27NB33Q',
  AWS_SECRET_KEY: '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',
  CORS_REMOTE: 'http://thinhtruong.asia',
};

const defaultConfig = {
  PORT: process.env.PORT || 4444,
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
