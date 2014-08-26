var config = {};

if (process.env.RAINBOWSLICE_DEBUGMODE) {
  config.DEBUG_MODE = true;
} else {
  config.DEBUG_MODE = false;
}

module.exports = config;
