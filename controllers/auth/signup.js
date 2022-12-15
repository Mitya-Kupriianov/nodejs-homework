/* eslint-disable no-undef */
const { User } = require("../../models/user");

const bcrypt = require("bcryptjs");

const { nanoid } = require("nanoid");

const { HttpError, sendEmail } = require("../../Helpers");

const dotenv = require("dotenv");

dotenv.config();

const { BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationCode = nanoid();

  const newUser = await User.create({
    email,
    password: hashPassword,
    verificationCode,
  });

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify${verificationCode}">Click to verify</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = signup;
