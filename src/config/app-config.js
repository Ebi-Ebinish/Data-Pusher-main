const dotEnv = require("dotenv");

const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });

module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  REDIS_PORT: process.env.REDIS_PORT,
  NODE_ENV:process.env.NODE_ENV
};
