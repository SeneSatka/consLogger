const { consLogger } = require("./src/cjs/index.js");
const logger = new consLogger({
  time: true,
  date: true,
  path: "/logger",
  dailyLog: true,
});
logger.console.log("Sa");
