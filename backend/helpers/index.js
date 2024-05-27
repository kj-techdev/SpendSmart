const crypto = require("crypto");

const random = () => crypto.randomBytes(128).toString("base64");

const authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update("SECRET_KEY")
    .digest("hex");
};

module.exports = { random, authentication };
