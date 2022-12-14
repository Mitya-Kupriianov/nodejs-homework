const { Schema, model } = require("mongoose");
const Joi = require("Joi");

const { handleSaveErrors } = require("../helpers");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const subscriptionStatus = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      require: [true, "Email is required"],
    },
    password: {
      type: String,
      minlenght: 6,
      require: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subscriptionStatus,
      default: "starter",
    },
    avatarUrl: {
      type: String,
      require: true,
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },

    token: { type: String, default: "" },
    avatarURL: { type: String, require: true },

  },

  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSaveErrors);

const signupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionStatus)
    .error(new Error("Subscription must be one of [starter, pro, business]")),
});


const verifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),

const updateAvatar = Joi.object({
  avatar: Joi.string(),
});

const schemas = {
  signupSchema,
  loginSchema,
  updateSubscription,
  verifySchema,
  updateAvatar,

};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
