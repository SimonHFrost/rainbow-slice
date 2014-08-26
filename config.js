var config = {};

config.DEBUG_MODE = process.env.RAINBOWSLICE_DEBUGMODE;
console.log('Debug mode = ' + config.DEBUG_MODE);

module.exports = config;
