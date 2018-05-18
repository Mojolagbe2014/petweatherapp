const env       = process.env.NODE_ENV || 'development';
const config    = require('./setup')[env];

module.exports = config;