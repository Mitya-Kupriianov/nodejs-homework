const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  verify,
  resendEmail,
};
