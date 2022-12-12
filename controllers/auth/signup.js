/* eslint-disable no-undef */
const { User } = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const { HttpError } = require("../../Helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarUrl,
  });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = signup;
