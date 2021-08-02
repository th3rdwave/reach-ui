'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./reach-popover.cjs.prod.js");
} else {
  module.exports = require("./reach-popover.cjs.dev.js");
}
