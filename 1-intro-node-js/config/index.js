const path = require("path");

const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../../.env") });
// __dirname the directory name of the current module,

exports.config = {
  apiKeyCats: process.env.API_KEY_CATS,
  port: process.env.PORT,
};
