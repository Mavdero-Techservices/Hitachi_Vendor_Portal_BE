
const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    TOKEN_KEY: process.env.TOKEN_KEY || "YOUR_secret_key",
  }
  const dotenv = require('dotenv');
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, 'Development.env') });
  require('dotenv').config({ path: path.join(__dirname, 'production.env') });
  dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
  });

  exports.config = config;

  